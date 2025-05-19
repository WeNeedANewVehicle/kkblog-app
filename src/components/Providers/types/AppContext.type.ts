import { ModalContext } from '@/components/Modal/types/ModalContext.type'
import { MeResponseDto } from '@/features/auth/api/dto/signIn.dto'

export interface AppContextType {
  modal: ModalContext
  isMenuOpen: boolean
  user: null | MeResponseDto
}
