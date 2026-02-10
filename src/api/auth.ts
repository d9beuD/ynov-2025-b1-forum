import { api } from '.'

export default {
  login: async (email: string, password: string): Promise<unknown> => {
    const response = await api.post('/auth', {
      body: JSON.stringify({ email, password }),
    })

    return response
  },
}
