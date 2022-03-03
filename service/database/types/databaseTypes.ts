export type DatabaseRequestBody = {
  router: string
  collectionName: string
  elementId: string
  filter?: string
  jsonValues: JSON
  cashTime: number
  pageNum?: number
  pageSize?: number
}