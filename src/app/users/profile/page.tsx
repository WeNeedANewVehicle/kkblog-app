'use client'

import Article from '@/components/Article/Article'
import FileUpload from '@/components/Button/FileUpload/FileUpload'
import LoginGuard from '@/components/Guard/LoginGuard'
import Input from '@/components/Input/Input'
import LabeledText from '@/components/Input/LabeledInput/LabeledInput'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import { DEFAULT_PROFILE_IMAGE } from '@/common/constant/constant'
import useGetMyProfile from '@/features/profile/hooks/useGetMyProfile'
import Button from '@/components/Button/Button'
import EditIcon from '@/../public/icons/edit.svg'
import CameraIcon from '@/../public/icons/camera.svg'

function ProfilePage() {
  const { data } = useGetMyProfile()

  const profile = useMemo(() => data?.data, [data])

  return (
    <LoginGuard>
      <title> 프로필 - 크크블로그 </title>
      <section>
        <Article title="사용자 정보">
          <div className="flex flex-col flex-1 gap-4 items-center">
            <div className="flex relative w-[240px] aspect-square justify-end items-end">
              <Image
                className="object-cover rounded-full border-4 border-gray-200 bg-gray-800"
                src={profile?.image ?? DEFAULT_PROFILE_IMAGE}
                fill
                alt="프로필 사진"
              />
              <label className="pointer absolute flex p-4 rounded-full aspect-square bg-black translate-x-[-14px] translate-y-[-14px]">
                <CameraIcon stroke="white" />
              </label>
            </div>

            <div className="flex pt-8">
              <Input
                value={profile?.user.nickname}
                className={`border-none text-4xl w-fit! text-center p-0!`}
              />
              <Button>
                <EditIcon />
              </Button>
            </div>
          </div>

          <LabeledText label="이메일" required>
            <Input
              value={profile?.user.email}
              disabled
              className="disabled:text-gray-600"
            />
          </LabeledText>

          <LabeledText label="한 줄 소개">
            <Input value={profile?.summary ?? ''} />
          </LabeledText>

          <LabeledText label="소개">
            <textarea value={profile?.bio ?? ''} />
          </LabeledText>
        </Article>
      </section>
    </LoginGuard>
  )
}

export default ProfilePage
