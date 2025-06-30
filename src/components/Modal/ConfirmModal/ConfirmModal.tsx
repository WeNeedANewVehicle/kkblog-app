import React from 'react'
import Modal, { ModalProps } from '@/components/Modal/Modal'
import CloseIcon from '@/../public/icons/close.svg'
import Button from '@/components/Button/Button'
import usePreventScroll from '@/common/hooks/usePreventScroll'

export interface ConfirmModalProps extends ModalProps {
  onClose: () => void
  onConfirm: () => void
  isOpen: boolean
  cancelText?: string
  confirmText?: string
  isPending?: boolean
  isConfirmDisabled?: boolean
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
  className,
  isConfirmDisabled,
  ...rest
}: ConfirmModalProps) {
  usePreventScroll(isOpen)

  if (!isOpen) {
    return
  }

  return (
    <>
      <div className="overlay overflow-hidden" />
      <Modal
        className={`screen-center modal z-10000 ${isOpen ? 'fixed' : 'hidden'} dark:text-white ${className}`}
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
            className="btn-warning box-sm-wide"
            onClick={onClose}
            isLoading={isPending}
          >
            {cancelText}
          </Button>
          <Button
            className={`btn-black box-sm-wide ${isConfirmDisabled && 'disabled:bg-gray-600! disabled:line-through'}`}
            onClick={onConfirm}
            isLoading={isPending}
            disabled={isConfirmDisabled}
          >
            {confirmText}
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default React.memo(ConfirmModal)
