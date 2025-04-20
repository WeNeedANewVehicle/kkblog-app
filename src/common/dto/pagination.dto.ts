import { OrderBy } from '@/common/types/orderBy.type'

export class PaginationDto {
  cursor?: string
  pageSize?: number
  order?: OrderBy = 'desc'
}
