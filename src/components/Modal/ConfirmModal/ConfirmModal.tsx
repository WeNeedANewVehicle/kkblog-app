import React, { useEffect } from 'react'
import Modal, { ModalProps } from '@/components/Modal/Modal'
import CloseIcon from '@/../public/icons/close.svg'
import Button from '@/components/Button/Button'

interface ConfirmModalProps extends ModalProps {
  onClose: () => void
  onConfirm: () => void
  isOpen: boolean
  cancelText?: string
  confirmText?: string
  isPending?: boolean
}

function ConfirmModal({
  title,
  isOpen,
  isPending,
  onClose,
  children,
  onConfirm,
  cancelText = '취소',
  confirmText = '확인',
  ...rest
}: ConfirmModalProps) {
  if (!isOpen) {
    return
  }

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      e.preventDefault()
    })
  }, [])

  return (
    <>
      <div className="overlay overflow-hidden" />
      <Modal
        className={`screen-center modal z-10000 ${isOpen ? 'fixed' : 'hidden'} dark:text-white`}
        isOpen
        {...rest}
      >
        <h2 className={`flex justify-between items-center font-bold`}>
          {title}
          <Button className={'flex self-end icon-btn'} onClick={onClose}>
            <CloseIcon className="icon interact-gray-icon dark:stroke-white!" />
          </Button>
        </h2>

        {children}
        <div className="flex gap-2 justify-end">
          <Button
            className="btn-black box-sm-wide"
            onClick={onClose}
            isLoading={isPending}
          >
            {cancelText}
          </Button>
          <Button
            className="btn-warning box-sm-wide"
            onClick={onConfirm}
            isLoading={isPending}
          >
            {confirmText}
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default React.memo(ConfirmModal)
