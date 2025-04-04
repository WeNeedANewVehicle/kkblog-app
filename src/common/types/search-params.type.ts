export type DynamicSearchParams = {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}
