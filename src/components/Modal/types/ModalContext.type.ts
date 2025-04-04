import { ModalProps } from "../Modal";

export interface ModalContextState<T> {
  Component: React.ComponentType<T extends ModalProps ? T : ModalProps>;
  props: T
}

export type ModalContext = Array<ModalContextState<any>>
