'use client'

import Article from '@/components/Article/Article'
import LoginGuard from '@/components/Guard/LoginGuard'
import Input from '@/components/Input/Input'
import LabeledText from '@/components/Input/LabeledInput/LabeledInput'
import Image from 'next/image'
import React, { MouseEvent, useCallback, useState } from 'react'
import { DEFAULT_PROFILE_IMAGE } from '@/common/constant/constant'
import useGetMyProfile from '@/features/profile/hooks/useGetMyProfile'
import Button from '@/components/Button/Button'
import EditIcon from '@/../public/icons/edit.svg'
import CameraIcon from '@/../public/icons/camera.svg'

import { toReadableDate } from '@/common/util/time.util'
import useProfileImageUploadSourceModal from '@/components/Modal/hooks/useProfileImageUploadSourceModal'
import useMyProfileForm from '@/features/profile/hooks/useMyProfileForm'

function ProfilePage() {
  const { data } = useGetMyProfile()
  const [isEditNickName, setIsEditNickName] = useState(false)
  const { register, formState, getValues, onResetFields } = useMyProfileForm({
    profile: data?.data,
  })

  const { onOpenModal, ref } = useProfileImageUploadSourceModal()

  const onEditNickName = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsEditNickName(true)
  }

  const onReset = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setIsEditNickName(false)
      onResetFields()
    },
    [onResetFields, setIsEditNickName]
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
                src={getValues('image') ?? DEFAULT_PROFILE_IMAGE}
                fill
                alt="프로필 사진"
              />
              <label className="pointer absolute flex p-4 rounded-full aspect-square bg-black translate-x-[-14px] translate-y-[-14px]">
                <Button onClick={onOpenModal}>
                  <CameraIcon stroke="white" />
                </Button>
                <Input hidden type="file" ref={ref} />
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
          <Button className="bg-black box-sm" onClick={() => {}}>
            수정
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
