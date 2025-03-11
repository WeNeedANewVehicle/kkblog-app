import { messages } from '@/common/messages/messages'

const ACCESS_TOKEN = 'ACCESS_TOKEN'

const { storage } = messages

const tokenStorage = {
  setAccessToken(token: string) {
    try {
      if (typeof window === 'undefined') {
        return '';
      }

      window.localStorage.setItem(ACCESS_TOKEN, token)
    } catch (e) {
      throw new Error(storage.auth.set_access_token_failed)
    }
  },

  getAccessToken() {
    try {
      if (typeof window === 'undefined') {
        return '';
      }

      const token = window.localStorage.getItem(ACCESS_TOKEN)

      if (!token) {
        return null
      }
      return token
    } catch (e) {
      console.log('????', e);
      // throw new Error(storage.auth.get_access_token_failed)
    }
  },

  clearAccessToken() {
    window.localStorage.removeItem(ACCESS_TOKEN)
  },
}

export default tokenStorage
