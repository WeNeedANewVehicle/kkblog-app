import React from 'react'
import Modal, { ModalProps } from '@/components/Modal/Modal'
import style from '@/components/Modal/ConfirmModal/ConfirmModal.module.css'
import { UseFormReturn } from 'react-hook-form'
import { PostSchema } from '@/features/posts/schema/post.schema'
import CloseIcon from '@/../public/icons/close.svg'

interface ConfirmModalProps extends ModalProps {
  onClose: () => void
  register: UseFormReturn<PostSchema>['register']
  onConfirm: () => void
  onUploadThumbnail: () => void
  isOpen: boolean
}

function ConfirmModal({
  title,
  isOpen,
  onClose,
  children,
  ...rest
}: ConfirmModalProps) {
  return (
    <Modal
      className={`flex flex-column flex-1 gap-1 ${style.wrapper} ${!isOpen && style.closed}`}
      isOpen
      {...rest}
    >
      <CloseIcon className={`flex self-end ${style.close}`} onClick={onClose} />
      <h2 className={`flex self-center font-bold ${style.title}`}>{title}</h2>
      {children}
    </Modal>
  )
}

export default ConfirmModal
