import type { HydraContext } from '@/types/api'
import type { User } from '@/types/user'

const baseURL = 'http://localhost:8000/api'

export class instance {
  defaultParams: RequestInit = {
    credentials: 'include',
  }

  defaultHeaders: RequestInit['headers'] = {
    'Content-Type': 'application/json',
    Accept: 'application/ld+json',
  }

  fetch = (input: RequestInfo | URL, init: RequestInit = {}) => {
    init = Object.assign<object, RequestInit, RequestInit>({}, this.defaultParams, init)

    init.headers = Object.assign<object, Required<RequestInit>['headers'], RequestInit['headers']>(
      {},
      init.headers ?? {},
      this.defaultHeaders,
    )

    return fetch(`${baseURL}${input}`, init)
      .then((response) => {
        if (!response.ok) {
          throw new Error(JSON.stringify(response.body))
        }
        return response
      })
      .then((data) => data.json())
  }

  post = (input: RequestInfo | URL, init: RequestInit = {}) => {
    init = Object.assign<RequestInit, RequestInit>(init, { method: 'POST' })
    return this.fetch(input, init)
  }

  get = (input: RequestInfo | URL, init: RequestInit = {}) => this.fetch(input, init)

  patch = (input: RequestInfo | URL, init: RequestInit = {}) => {
    init = Object.assign<RequestInit, RequestInit>(init, { method: 'PATCH' })
    return this.fetch(input, init)
  }

  delete = (input: RequestInfo | URL, init: RequestInit = {}) => {
    init = Object.assign<RequestInit, RequestInit>(init, { method: 'DELETE' })
    return this.fetch(input, init)
  }
}

export const api = new instance()

export async function getUser(id: number): Promise<HydraContext<User>> {
  const response = await api.fetch('/users/' + id).then((data) => data.json())
  return response
}

export async function login(email: string, password: string): Promise<unknown> {
  const response = await api.post('/auth', {
    body: JSON.stringify({ email, password }),
  })

  return response
}

export function getCurrentUser(): Promise<HydraContext<User>> {
  return api.get('/users/current') as unknown as Promise<HydraContext<User>>
}
