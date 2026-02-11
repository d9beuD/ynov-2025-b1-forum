import type { HydraContext } from '@/types/api'
import { _api } from '.'
import type { User } from '@/types/user'

export default {
  get: (id: number) => {
    return _api.get<HydraContext<User>>('/users/' + id)
  },

  getCurrent: () => _api.get<HydraContext<User>>('/users/current'),
}
