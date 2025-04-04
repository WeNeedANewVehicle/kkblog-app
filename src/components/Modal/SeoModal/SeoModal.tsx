import React from 'react'
import Modal, { ModalProps } from '@/components/Modal/Modal'

interface SeoModalProps extends ModalProps {

}

function SeoModal({ ...rest}: SeoModalProps) {
  return (
    <Modal {...rest}>
      <h2>게시물 등록</h2>
    </Modal>
  )
}

export default SeoModal
