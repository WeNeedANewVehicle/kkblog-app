export const isProd: boolean = process.env.NODE_ENV === 'production'

export const baseUrl = isProd ? 'https://kkblog.com' : 'http://localhost:8080'

export enum METHODS {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}
