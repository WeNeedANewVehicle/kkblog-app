import React, { ChangeEvent, useState } from 'react'
import Modal, { ModalProps } from '@/components/Modal/Modal'
import style from '@/components/Modal/SeoModal/SeoModal.module.css'
import buttonCss from '@/common/styles/button.module.css'

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
  return (
    <Modal
      className={`flex flex-column flex-1 gap-1 ${style.wrapper} ${!isOpen && style.closed}`}
      isOpen
      {...rest}
    >
      <CloseIcon className={`flex self-end ${style.close}`} onClick={onClose} />
      <h2 className={`flex self-center font-bold ${style.title}`}>SEO 설정 </h2>
      <form className="flex flex-column gap-1" onSubmit={onConfirm}>
        <div>
          <LabeledText label="썸네일 이미지">
            <div
              className={`flex justify-center items-center relative ${style.preview}`}
            >
              <label
                className={`flex sm pointer ${buttonCss.black}`}
                htmlFor="thumbnail"
              >
                등록하기
              </label>
              {watch('attachedFiles')?.item(0) && (
                <Image
                  src={URL.createObjectURL(
                    watch('attachedFiles')?.item(0) as Blob
                  )}
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

        <LabeledText label="메타 태그 제목">
          <Input value={getValues('title')} readOnly />
        </LabeledText>

        <LabeledText label="메타 태그 설명">
          <Input {...register('desc')} />
        </LabeledText>

        <div className="flex gap-1">
          <Button type="submit">등록</Button>
          <Button
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

export default SeoModal
