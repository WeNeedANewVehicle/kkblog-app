import React, { ChangeEvent, forwardRef, useCallback, useState } from 'react'
import ConfirmModal, {
  ConfirmModalProps,
} from '@/components/Modal/ConfirmModal/ConfirmModal'
import Input from '@/components/Input/Input'
import { ProfileImageSource } from '@/components/Modal/ImageUploadSourceModal/types/profileImageSource.type'

export interface ImageUploadSourceModalProps
  extends Omit<ConfirmModalProps, 'onConfirm'> {}

const ImageUploadSourceModal = forwardRef<
  HTMLInputElement,
  ImageUploadSourceModalProps
>(({ isOpen, onClose }, ref) => {
  //
  const [profileImageSource, setProfileImageSource] =
    useState<ProfileImageSource>()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileImageSource(e.target.value as ProfileImageSource)
  }

  const onConfirm = useCallback(() => {
    if (!profileImageSource) {
      return
    }

    if (profileImageSource === ProfileImageSource.TAKE) {
      return alert('촬영하기')
    }

    if (
      profileImageSource === ProfileImageSource.UPLOAD &&
      ref &&
      'current' in ref
    ) {
      // 파일 업로드를 위해 파일선택 버튼 클릭 행동
      ref?.current?.click()
    }

    onClose()
  }, [ref, profileImageSource, onClose])

  return (
    <ConfirmModal
      isOpen={isOpen}
      title="프로필 사진 업로드"
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <form className="flex flex-col gap-2 items-start">
        <label className="flex flex-1 gap-2">
          <Input
            type="radio"
            className="w-fit!"
            name="profilePicture"
            value={ProfileImageSource.TAKE}
            onChange={onChange}
          />
          {ProfileImageSource.TAKE}
        </label>

        <label className="flex flex-1 gap-2">
          <Input
            type="radio"
            className="w-fit!"
            name="profilePicture"
            value={ProfileImageSource.UPLOAD}
            onChange={onChange}
          />
          {ProfileImageSource.UPLOAD}
        </label>
      </form>
    </ConfirmModal>
  )
})

ImageUploadSourceModal.displayName = 'ImageUploadSourceModal'
export default React.memo(ImageUploadSourceModal)
