export type DynamicParam<T extends string> = {
  params: Promise<{ [K in T]: string }>
}
