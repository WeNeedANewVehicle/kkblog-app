import React, { HTMLAttributes } from 'react'

export interface ModalProps extends HTMLAttributes<HTMLDialogElement> {
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ children, ...rest }: ModalProps) {
  return <dialog {...rest}>{children}</dialog>
}

export default Modal
