const route = {
  index: '/',
  about: '/about',
  auth: {
    index: '/auth',
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    reset: '/auth/reset/password',
    logout: '/auth/logout',
  },

  posts: {
    index: '/posts',
    detail: (id: string) => `/posts/${id}`,
    write: '/posts/write',
  },
  portfolio: '/portfolio',

  error: '/error',
  notFound: '/not-found',
}

export default route
