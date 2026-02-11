import auth from './auth'
import users from './users'

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
      .then((data) => data.text())
      .then((text) => (text.length ? JSON.parse(text) : text)) as unknown as Promise<T>
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

export const _api = new instance()

export default {
  auth,
  users,
}
