import React, { MouseEvent, useCallback, useState } from 'react'
import useModal from '@/components/Modal/hooks/useModal'
import ImageUploadSourceModal from '@/components/Modal/ImageUploadSourceModal/ImageUploadSourceModal'
import { ProfileImageSource } from '@/components/Modal/ImageUploadSourceModal/types/profileImageSource.type'
import useAttachFile from '@/features/files/hooks/useAttachFile'

function useProfileImageUploadSourceModal() {
  const { open, close, update } = useModal(ImageUploadSourceModal)
  const { ref } = useAttachFile()
  const [profileImageSource, setProfileImageSource] = useState<ProfileImageSource>()

  const onConfirm = useCallback(() => {
    console.log(profileImageSource)
  }, [profileImageSource])

  const onOpenModal = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      open({
        profileImageSource,
        isOpen: true,
        onClose: close,
        onConfirm,
        onChangeRadio: (e) => setProfileImageSource(e.target.value as ProfileImageSource),
      })
    },
    [open, close, onConfirm, setProfileImageSource, profileImageSource]
  )

  return {
    onOpenModal,
    ref
  }
}

export default useProfileImageUploadSourceModal
