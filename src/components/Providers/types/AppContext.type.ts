import { ModalContext } from '@/components/Modal/types/ModalContext.type'
import { Author } from '@/features/auth/types/auth.type'

export interface AppContextType {
  modal: ModalContext
  isMenuOpen: boolean
  user: null | Author
}
