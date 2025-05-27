import React, { MouseEvent, useCallback, useMemo } from 'react'
import Modal, { ModalProps } from '@/components/Modal/Modal'

import CloseIcon from '@/../public/icons/close.svg'
import LabeledText from '@/components/Input/LabeledInput/LabeledInput'
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import { UseFormReturn } from 'react-hook-form'
import { PostSchema } from '@/features/posts/schema/post.schema'
import Image from 'next/image'
import usePreventScroll from '@/common/hooks/usePreventScroll'

type PostSchemaFormReturn = UseFormReturn<PostSchema>;

interface SeoModalProps extends ModalProps {
  onClose: () => void
  register: PostSchemaFormReturn['register']
  onConfirm: () => void
  getValues: PostSchemaFormReturn['getValues']
  watch: PostSchemaFormReturn['watch']
  setValue: PostSchemaFormReturn['setValue']
}

function SeoModal({
  onClose,
  onConfirm,
  children,
  isOpen,
  register,
  getValues,
  setValue,
  watch,
  ...rest
}: SeoModalProps) {
  const attachedFiles = watch('attachedFiles')
  const thumbnail = watch('thumbnail')

  const previewImg = useMemo(() => attachedFiles?.item(0), [attachedFiles])
  const hasImage = useMemo(
    () => Boolean(previewImg || thumbnail),
    [previewImg, thumbnail]
  )

  const onClearImage = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setValue('attachedFiles', undefined);
    setValue('thumbnail', undefined);
  }, [setValue])
  usePreventScroll(isOpen)

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
              {hasImage && (
                <Button
                  className="absolute top-0 right-0 z-10 flex self-end icon-btn w-fit border"
                  onClick={onClearImage}
                >
                  <CloseIcon />
                </Button>
              )}
              <label
                className={`flex box-sm pointer btn-black`}
                htmlFor="thumbnail"
              >
                등록하기
              </label>
              {hasImage && (
                <Image
                  src={
                    previewImg
                      ? URL.createObjectURL(previewImg as Blob)
                      : watch('thumbnail')!
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

        <div className="grid lg:col-span-12 grid-cols-2 gap-4 h-fit">
          <Button type="submit" className="icon-btn btn-black rounded-none!">
            등록
          </Button>
          <Button
            className="icon-btn btn-black rounded-none!"
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
