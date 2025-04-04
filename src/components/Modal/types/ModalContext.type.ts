import { ModalProps } from '@/components/Modal/Modal'

export interface ModalContextState<T> {
  Component: React.ComponentType<T extends ModalProps ? T : ModalProps>
  props: T
}

export type ModalContext = Array<ModalContextState<any>>
