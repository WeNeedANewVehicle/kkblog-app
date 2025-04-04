import React, { HTMLAttributes } from 'react'

export interface ModalProps extends HTMLAttributes<HTMLDialogElement> {
  isOpen: boolean
}

function Modal({ isOpen, children, ...rest }: ModalProps) {
  return <dialog {...rest}>{children}</dialog>
}

export default Modal
