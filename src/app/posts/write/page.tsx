'use client'
import dynamic from 'next/dynamic'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import useUploadFile from '@/features/files/hooks/useUploadFile'

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
    tagFields,
    getValues,
    setFocus,
    handleSubmit,
    onChangeEditor,
    onChangeTag,
    watch,
    isValid,
    isSubmitting,
    isLoading,
  } = usePostForm()

  const [isOpen, setIsOpen] = useState(false)
  const { mutateAsync: createPost } = useCreatePost()
  const { mutateAsync: uploadFile, isPending } = useUploadFile()

  const onConfirm = handleSubmit(async (values) => {
    const attachedFiles = values.attachedFiles?.item(0)
    const form = new FormData()

    if (attachedFiles) {
      form.append('file', attachedFiles, attachedFiles.name)
    }

    const result = await uploadFile(form)

    await createPost({
      content: values.content,
      tags: values?.tags ?? [],
      title: values.title,
      files: values.files,
      thumbnail: result.data,
      desc: values.desc,
    })
  })

  const onSubmit = handleSubmit(
    useCallback(
      async (values) => {
        delete values.tagInput
        setIsOpen(true)
      },
      [register, getValues, onConfirm, watch]
    )
  )

  const isDisabled = useMemo(
    () => !isValid || isLoading || isSubmitting,
    [isValid, isLoading, isSubmitting]
  )

  useEffect(() => {
    return () => {
      setFocus('title')
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
            fields={tagFields.fields}
            remove={tagFields.remove}
            append={tagFields.append}
            {...register('tagInput', {
              onChange: onChangeTag,
            })}
          />

          <div className="flex gap-half"></div>
        </div>

        <div className="flex flex-column flex-1 gap-half ">
          <h2>내용</h2>
          <DynamicWysiwygEditor onChange={onChangeEditor} />
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

      <SeoModal
        //
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        getValues={getValues}
        watch={watch}
        onConfirm={onConfirm}
        register={register}
      />
    </LoginGuard>
  )
}

export default PostWritePage
