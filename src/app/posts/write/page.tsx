'use client'
import dynamic from 'next/dynamic'
import React, { ChangeEvent, useCallback, useEffect, useMemo } from 'react'
import Loading from '@/../public/icons/loading.svg'
import LoginGuard from '@/components/Guard/LoginGuard'
import Button from '@/components/Button/Button'
import LabeledText from '@/components/Input/LabeledInput/LabeledInput'
import Input from '@/components/Input/Input'
import Link from 'next/link'
import route from '@/routes/routes'
import usePostForm from '@/features/posts/hooks/usePostForm'
import TagsInput from '@/components/Input/TagInput/TagInput'
import useCreatePost from '@/features/posts/hooks/useCreatePost'

import SeoModal from '@/components/Modal/SeoModal/SeoModal'
import useModal from '@/components/Modal/hooks/useModal'

const DynamicWysiwygEditor = dynamic(
  () => import('@/components/WysiwygEditor/WysiwygEditor'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

function PostWritePage() {
  const {
    register,
    fields,
    remove,
    append,
    setValue,
    handleSubmit,
    isValid,
    isSubmitting,
    isLoading,
  } = usePostForm()

  const { open, close } = useModal(SeoModal)
  const { mutateAsync: createPost } = useCreatePost()

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const isEmpty = value.trim() === ','

      if (e.target.value.endsWith(',') && !isEmpty) {
        append({
          label: e.target.value.slice(0, -1),
        })
        e.target.value = ''
      }
    },
    [append]
  )

  const onSubmit = handleSubmit(
    useCallback(
      async (values) => {
        delete values.tagInput
        open({
          isOpen: true,
          onClose: close,
        })
        // await createPost(values)
      },
      [createPost, open, close]
    )
  )

  const isDisabled = useMemo(
    () => !isValid || isLoading || isSubmitting,
    [isValid, isLoading, isSubmitting]
  )

  useEffect(() => {
    return () => {
      open({
        onClose: close,
        isOpen: false,
      })
    }
    // eslint-disable-next-line
  }, [])

  return (
    <LoginGuard>
      <form className="flex flex-column flex-1 gap-1" onSubmit={onSubmit}>
        <div>
          <LabeledText label="제목">
            <Input {...register('title')} />
          </LabeledText>
        </div>

        <div className="flex flex-column gap-1">
          <TagsInput
            //
            isEdit
            fields={fields}
            remove={remove}
            append={append}
            {...register('tagInput', {
              onChange,
            })}
          />

          <div className="flex gap-half"></div>
        </div>

        <div className="flex flex-column flex-1 gap-half ">
          <h2>내용</h2>
          <DynamicWysiwygEditor
            onChange={(_, editor) => setValue('content', editor.getData())}
          />
        </div>

        <div className="flex gap-1">
          <Link
            className="sm flex items-center bg-gray-100 color-gray-200"
            href={route.posts.index}
          >
            돌아가기
          </Link>
          <Button size="sm">임시 저장</Button>
          <Button
            type="submit"
            size="sm"
            className="bg-black color-white"
            disabled={isDisabled}
          >
            작성
          </Button>
        </div>
      </form>
    </LoginGuard>
  )
}

export default PostWritePage
