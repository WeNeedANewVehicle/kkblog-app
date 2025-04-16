import route from '@/routes/routes'

export const isProd: boolean = process.env.NODE_ENV === 'production'

export const baseUrl = isProd
  ? 'http://api.kkblog.p-e.kr'
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
]

export const allowedFileExtensions = []
