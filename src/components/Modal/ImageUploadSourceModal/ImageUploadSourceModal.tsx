import React, { ChangeEventHandler } from 'react'
import ConfirmModal, {
  ConfirmModalProps,
} from '@/components/Modal/ConfirmModal/ConfirmModal'
import Input from '@/components/Input/Input'
import { ProfileImageSource } from '@/components/Modal/ImageUploadSourceModal/types/profileImageSource.type'

export interface ImageUploadSourceModalProps extends ConfirmModalProps {
  onChangeRadio: ChangeEventHandler<HTMLInputElement>
  profileImageSource: ProfileImageSource | undefined
}

function ImageUploadSourceModal({
  isOpen,
  onClose,
  onConfirm,
  onChangeRadio,
  profileImageSource,
}: ImageUploadSourceModalProps) {
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
            onChange={onChangeRadio}
            defaultChecked={profileImageSource === ProfileImageSource.TAKE}
          />
          {ProfileImageSource.TAKE}
        </label>

        <label className="flex flex-1 gap-2">
          <Input
            type="radio"
            className="w-fit!"
            name="profilePicture"
            value={ProfileImageSource.UPLOAD}
            onChange={onChangeRadio}
            defaultChecked={profileImageSource === ProfileImageSource.UPLOAD}
          />
          {ProfileImageSource.UPLOAD}
        </label>
      </form>
    </ConfirmModal>
  )
}

export default React.memo(ImageUploadSourceModal)
