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
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'

const DynamicWysiwygEditor = dynamic(
  () => import('@/components/WysiwygEditor/WysiwygEditor'),
  {
    ssr: false,
    loading: () => <div><Loading /><div>에디터를 불러오는 중입니다.</div></div>,
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
    formState,
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
      []
    )
  )

  useEffect(() => {
    return () => {
      setFocus('title')
    }
    // eslint-disable-next-line
  }, [])

  return (
    <LoginGuard>
      <form className="flex flex-col flex-1 gap-4" onSubmit={onSubmit}>
        <div>
          <LabeledText label="제목">
            <Input {...register('title')} placeholder='여기에 제목을 입력하세요'/>
          </LabeledText>
          <ErrorMessage message={formState.errors.title?.message} />
        </div>

        <div className="flex flex-col gap-1">
          <div>
            태그 ({tagFields.fields.length}/10)
          </div>
          <TagsInput
            //
            isEdit
            fields={tagFields.fields}
            remove={tagFields.remove}
            append={tagFields.append}
            maxLength={10}
            {...register('tagInput', {
              onChange: onChangeTag,
            })}
          />
          <ErrorMessage message={formState.errors.tagInput?.message ?? formState.errors.tags?.message }/>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <h2>내용</h2>
          <DynamicWysiwygEditor onChange={onChangeEditor} />
          <ErrorMessage message={formState.errors.content?.message}/>
        </div>

        <div className="flex gap-4">
          <Link
            className="flex items-center bg-gray-100 color-gray-200"
            href={route.posts.index}
          >
            돌아가기
          </Link>
          <Button className=''>임시 저장</Button>
          <Button
            type="submit"
            className="bg-black color-white"
            disabled={formState.isLoading || formState.isSubmitting}
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
