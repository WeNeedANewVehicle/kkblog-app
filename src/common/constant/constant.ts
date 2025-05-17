import route from '@/routes/routes'
import { OrderBy } from '../types/orderBy.type'

export const isProd: boolean = process.env.NODE_ENV === 'production'

export const baseUrl = isProd
  ? 'https://api.kkblog.co.kr'
  : 'http://localhost:8080'

export enum METHODS {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}

export const hideGnbPaths = [
  route.auth.signUp,
  route.auth.signIn,
  route.posts.write,
  route.posts.edit(''),
]

export const ORDER_BY: Record<'ASC' | 'DESC', OrderBy> = {
  ASC: 'asc',
  DESC: 'desc',
}

export const allowedFileExtensions = []
