import React, { MouseEvent, useCallback, useState } from 'react'
import useModal from '@/components/Modal/hooks/useModal'
import ImageUploadSourceModal from '@/components/Modal/ImageUploadSourceModal/ImageUploadSourceModal'
import { ProfileImageSource } from '@/components/Modal/ImageUploadSourceModal/types/profileImageSource.type'
import useAttachFile from '@/features/files/hooks/useAttachFile'

function useProfileImageUploadSourceModal() {
  const { open, close, update } = useModal(ImageUploadSourceModal)
  const { ref } = useAttachFile()

  const onOpenModal = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      open({
        isOpen: true,
        onClose: close,
        ref
      })
    },
    [open, close, ref]
  )

  return {
    onOpenModal,
    ref
  }
}

export default useProfileImageUploadSourceModal
