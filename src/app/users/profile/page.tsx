'use client'

import Article from '@/components/Article/Article'
import LoginGuard from '@/components/Guard/LoginGuard'
import Input from '@/components/Input/Input'
import LabeledText from '@/components/Input/LabeledInput/LabeledInput'
import Image from 'next/image'
import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { DEFAULT_PROFILE_IMAGE } from '@/common/constant/constant'
import useGetMyProfile from '@/features/profile/hooks/useGetMyProfile'
import Button from '@/components/Button/Button'
import EditIcon from '@/../public/icons/edit.svg'
import CameraIcon from '@/../public/icons/camera.svg'
import TrashCanIcon from '@/../public/icons/trashcan.svg'
import { toReadableDate } from '@/common/util/time.util'
import useProfileImageUploadSourceModal from '@/components/Modal/hooks/useProfileImageUploadSourceModal'
import useMyProfileForm from '@/features/profile/hooks/useMyProfileForm'
import useUpdateMyProfile from '@/features/profile/hooks/useUpdateMyProfile'
import Loading from '@/../public/icons/loading.svg'
import useUploadFile from '@/features/files/hooks/useUploadFile'
import { FileUploadPath } from '@/common/enum/uploadPath.enum'

function ProfilePage() {
  const { data } = useGetMyProfile()
  const [isEditNickName, setIsEditNickName] = useState(false)
  const [preview, setPreview] = useState<string>()

  const {
    //
    register,
    formState,
    onResetFields,
    setValue,
    watch,
    handleSubmit,
  } = useMyProfileForm({
    profile: data?.data,
  })

  const {
    //
    mutateAsync: updateMyProfile,
    isPending,
  } = useUpdateMyProfile()

  const {
    //
    mutateAsync: uploadFile,
    isPending: isUploadFilePending,
  } = useUploadFile()

  const { onOpenModal, ref } = useProfileImageUploadSourceModal()

  const onReset = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setIsEditNickName(false)
      onResetFields()
      setPreview(undefined)
    },
    [onResetFields, setIsEditNickName]
  )

  const onEditNickName = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsEditNickName(true)
  }

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)

    if (!file) {
      return
    }

    // 미리보기 생성
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // react-hook-fomr 값 업데이트
    setValue('attachedFile', e.target.files!)
  }

  const clearUploadedImage = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      preview ? setPreview(undefined) : setValue('image', undefined)
    },
    [preview, setValue]
  )

  const onSubmit = handleSubmit(
    useCallback(
      async ({ nickname, bio, image, summary, attachedFile }) => {
        let newImage = null

        if (attachedFile?.item(0)) {
          const form = new FormData()
          form.append('file', attachedFile.item(0)!, attachedFile.item(0)!.name)
          form.append('path', FileUploadPath.TEMP)
          const uploadedImage = await uploadFile(form, {
            onSuccess: () => setValue('attachedFile', undefined),
          })
          newImage = uploadedImage.data
        }

        await updateMyProfile({
          nickname,
          bio: bio || null,
          image: newImage || image || null,
          summary: summary || null,
        })
      },
      [updateMyProfile, uploadFile, setValue]
    )
  )

  const isLoading = useMemo(
    () =>
      formState.isLoading ||
      formState.isSubmitting ||
      isPending ||
      isUploadFilePending,
    [
      formState.isLoading,
      formState.isSubmitting,
      isPending,
      isUploadFilePending,
    ]
  )

  return (
    <LoginGuard>
      <title> 프로필 - 크크블로그 </title>
      <form>
        <Article title="사용자 정보">
          <div className="flex flex-col flex-1 gap-4 items-center">
            <div className="flex relative w-[240px] aspect-square justify-end items-end">
              <Image
                className="object-cover rounded-full border-4 border-gray-200 bg-gray-800"
                src={preview ?? watch('image') ?? DEFAULT_PROFILE_IMAGE}
                fill
                alt="프로필 사진"
              />

              {(preview || watch('image')) && (
                <Button
                  onClick={clearUploadedImage}
                  className="absolute right-0 top-0 box-sm bg-red-500 rounded-full translate-x-[-14px] translate-y-[14px]"
                >
                  <TrashCanIcon width={24} height={24} />
                </Button>
              )}

              <label className="pointer absolute flex box-sm rounded-full aspect-square bg-black translate-x-[-14px] translate-y-[-14px]">
                <Button onClick={onOpenModal}>
                  <CameraIcon stroke="white" />
                </Button>
                <Input hidden type="file" ref={ref} onChange={onChangeImage} />
              </label>
            </div>

            <div className="flex flex-row max-sm:flex-col gap-4 pt-8">
              <Input
                {...register('nickname')}
                disabled={!isEditNickName}
                className={`flex text-4xl w-fit! text-center p-0! ${!isEditNickName && 'border-none'}`}
              />
              <Button onClick={onEditNickName}>
                <EditIcon />
              </Button>
            </div>
          </div>

          <LabeledText label="이메일" required>
            <Input
              {...register('email')}
              disabled
              readOnly
              className="disabled:text-gray-600"
            />
          </LabeledText>

          <LabeledText label="한 줄 소개">
            <Input {...register('bio')} />
          </LabeledText>

          <LabeledText label="소개">
            <textarea
              className="border-2 box-sm border-gray-800"
              {...register('summary')}
            />
          </LabeledText>

          <div className="flex self-end text-gray-600 ">
            마지막 수정일: {toReadableDate(data?.data.updatedAt!)}
          </div>
        </Article>

        <div className="flex pt-8">
          <Button
            className="bg-black box-sm"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : '수정'}
          </Button>
          <Button
            className="box-sm hover:bg-burgundy-100 text-red-600"
            onClick={onReset}
          >
            초기화
          </Button>
        </div>
      </form>
    </LoginGuard>
  )
}

export default ProfilePage
