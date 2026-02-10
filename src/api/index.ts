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

  fetch = <T>(input: RequestInfo | URL, init: RequestInit = {}): Promise<T> => {
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
      .then((data) => data.json()) as unknown as Promise<T>
  }

  post = <T>(input: RequestInfo | URL, init: RequestInit = {}): Promise<T> => {
    init = Object.assign<RequestInit, RequestInit>(init, { method: 'POST' })
    return this.fetch(input, init)
  }

  get = <T>(input: RequestInfo | URL, init: RequestInit = {}): Promise<T> =>
    this.fetch<T>(input, init)

  patch = <T>(input: RequestInfo | URL, init: RequestInit = {}): Promise<T> => {
    init = Object.assign<RequestInit, RequestInit>(init, { method: 'PATCH' })
    return this.fetch(input, init)
  }

  delete = <T>(input: RequestInfo | URL, init: RequestInit = {}): Promise<T> => {
    init = Object.assign<RequestInit, RequestInit>(init, { method: 'DELETE' })
    return this.fetch(input, init)
  }
}

export const api = new instance()

export function getUser(id: number) {
  return api.get<HydraContext<User>>('/users/' + id)
}

export async function login(email: string, password: string): Promise<unknown> {
  const response = await api.post('/auth', {
    body: JSON.stringify({ email, password }),
  })

  return response
}

export function getCurrentUser() {
  return api.get<HydraContext<User>>('/users/current')
}
