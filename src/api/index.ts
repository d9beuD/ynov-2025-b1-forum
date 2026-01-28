import type { HydraContext } from '@/types/api'
import type { User } from '@/types/user'

const baseURL = 'http://localhost:8000/api'

export class instance {
  jwt: string | null = null

  fetch = (input: RequestInfo | URL, init: RequestInit = {}) => {
    if (this.jwt) {
      init.headers = Object.assign<Required<RequestInit>['headers'], RequestInit['headers']>(
        init.headers ?? {},
        { Authorization: `Bearer ${this.jwt}` },
      )
    }

    init.headers = Object.assign<Required<RequestInit>['headers'], RequestInit['headers']>(
      init.headers ?? {},
      {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    )

    return fetch(`${baseURL}${input}`, init)
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

export async function login(email: string, password: string): Promise<{ token: string }> {
  const response = await api
    .post('/auth', {
      body: JSON.stringify({ email, password }),
    })
    .then((data) => data.json() as unknown as { token: string })
    .then((data) => {
      api.jwt = data.token
      return data
    })

  return response
}
