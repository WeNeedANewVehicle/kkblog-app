import { messages } from '@/common/messages/messages'

const REDIRECTION_URL = 'REDIRECITON_URL'

const { storage } = messages

const redirectStorage = {
  setRedirectUrl(url: string) {
    try {
      window.sessionStorage.setItem(REDIRECTION_URL, url)
    } catch (e) {
      throw new Error(storage.redirection.set_redirect_url_failed)
    }
  },

  getRedirectUrl() {
    try {
      const redirectUrl = window.sessionStorage.getItem(REDIRECTION_URL)
      return redirectUrl ?? null
    } catch (e) {
      throw new Error(storage.redirection.get_redirect_url_failed)
    }
  },
}

export default redirectStorage
