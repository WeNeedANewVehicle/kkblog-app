import React from 'react'
import { useAppContext } from '@/components/Providers/hooks/useAppContext'

function ModalContainer() {
  const state = useAppContext()

  return state.modal.map((modalProps, index) => {
    const ModalComponent = modalProps.Component

    if (ModalComponent) {
      return <ModalComponent key={index} {...modalProps.props} />
    }
  })
}

export default ModalContainer
