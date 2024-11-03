const route = {
    index: "/",
    about: "/about",
    auth: {
        index: "/auth",
        signIn: '/auth/sign-in',
        signUp: '/auth/sign-up',
        reset: '/auth/reset/password',
        logout: '/auth/logout'
    },

    posts: {
        index: "/posts",
        write: "/posts/write"
    },
    portfolio: "/portfolio",
}

export default route;