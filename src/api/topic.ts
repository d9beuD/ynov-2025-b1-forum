import type { Collection, HydraContext } from '@/types/api'
import { _api } from '.'
import type { Topic } from '@/types/topic'

export default {
  get: (id: number) => _api.get<HydraContext<Topic>>(`/topics/${id}`),
  getCollection: () => _api.get<Collection<Topic>>('/topics'),
}
