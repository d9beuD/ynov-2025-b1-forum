import type { HydraContext } from '@/types/api'
import { api } from '.'
import type { User } from '@/types/user'

export default {
  get: (id: number) => {
    return api.get<HydraContext<User>>('/users/' + id)
  },

  getCurrent: () => api.get<HydraContext<User>>('/users/current'),
}
