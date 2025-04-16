import React, { useMemo } from 'react'
import Modal, { ModalProps } from '@/components/Modal/Modal'

import CloseIcon from '@/../public/icons/close.svg'
import LabeledText from '@/components/Input/LabeledInput/LabeledInput'
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import { UseFormReturn } from 'react-hook-form'
import { PostSchema } from '@/features/posts/schema/post.schema'
import Image from 'next/image'

interface SeoModalProps extends ModalProps {
  onClose: () => void
  register: UseFormReturn<PostSchema>['register']
  onConfirm: () => void
  getValues: UseFormReturn<PostSchema>['getValues']
  watch: UseFormReturn<PostSchema>['watch']
}

function SeoModal({
  onClose,
  onConfirm,
  children,
  isOpen,
  register,
  getValues,
  watch,
  ...rest
}: SeoModalProps) {
  const previewImg = useMemo(() => watch('attachedFiles')?.item(0), [watch])

  return (
    <Modal
      className={`z-[10000] flex flex-col flex-1 w-full h-[100dvh] fixed left-0 top-0 gap-4 p-4 bg-white dark:bg-gray-900 transition-transform ease-in origin-bottom text-black dark:text-gray-200 animate-swipe-bottom ${isOpen && 'animate-swipe-bottom-hidden'} motion-reduce:transition-none`}
      isOpen
      {...rest}
    >
      <Button className="flex self-end icon-btn w-fit" onClick={onClose}>
        <CloseIcon
          className={`icon pointer stroke-black dark:stroke-gray-200`}
        />
      </Button>
      <h2 className={`flex self-center font-bold text-[2rem]`}>SEO 설정 </h2>

      <form
        className="grid grid-rows-1 lg:grid-rows-4 lg:grid-cols-12 gap-4"
        onSubmit={onConfirm}
      >
        <div className="grid col-span-6 row-span-1">
          <LabeledText
            className="flex flex-col gap-2 w-full"
            label="썸네일 이미지"
          >
            <div
              className={`flex justify-center items-center relative aspect-video border-2 border-black dark:border-gray-800`}
            >
              <label
                className={`flex box-sm pointer btn-black`}
                htmlFor="thumbnail"
              >
                등록하기
              </label>
              {previewImg && (
                <Image
                  src={
                    URL.createObjectURL(previewImg as Blob) ??
                    watch('thumbnail')
                  }
                  fill
                  alt={`게시물 "${getValues('title')}"의 썸네일 이미지가 보입니다.`}
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
          </LabeledText>
          <Input
            type="file"
            hidden
            id="thumbnail"
            accept="image/*"
            {...register('attachedFiles')}
          />
        </div>

        <div className="gap-2 grid col-span-6 ">
          <LabeledText className="flex flex-col gap-2" label="메타 태그 제목">
            <Input value={getValues('title')} readOnly />
          </LabeledText>

          <LabeledText className="grid h-full" label="메타 태그 설명">
            <textarea
              className="border-2 border-gray-800"
              maxLength={300}
              {...register('desc')}
            />
          </LabeledText>
        </div>

        <div className="grid lg:col-span-12 grid-cols-2 gap-4">
          <Button type="submit" className="icon-btn btn-black">
            등록
          </Button>
          <Button
            className="icon-btn btn-black"
            onClick={(e) => {
              e.preventDefault()
              onClose()
            }}
          >
            돌아가기
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default React.memo(SeoModal)
