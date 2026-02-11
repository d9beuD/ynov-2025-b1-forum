export type HydraContext<T> = T & {
  '@context': string
  '@id': string
  '@type': string
}

export interface Collection<T> {
  totalItems: number
  search: object
  view: object
  member: HydraContext<T>[]
}
