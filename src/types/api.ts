export type HydraContext<T> = T & {
  '@context': string
  '@id': string
  '@type': string
}
