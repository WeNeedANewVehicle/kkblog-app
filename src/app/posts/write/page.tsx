'use client'

import React, { useCallback, useEffect, useState } from 'react'
import LoginGuard from '@/components/Guard/LoginGuard'
import usePostForm from '@/features/posts/hooks/usePostForm'
import useCreatePost from '@/features/posts/hooks/useCreatePost'
import SeoModal from '@/components/Modal/SeoModal/SeoModal'
import useUploadFile from '@/features/files/hooks/useUploadFile'
import PostWrite from '@/components/Post/PostWrite/PostWrite'
import { FileUploadPath } from '@/common/enum/uploadPath.enum'

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
    setValue,
    formState,
  } = usePostForm()

  const [isOpen, setIsOpen] = useState(false)
  const { mutateAsync: createPost } = useCreatePost()
  const { mutateAsync: uploadFile } = useUploadFile()

  const onConfirm = handleSubmit(
    async ({
      attachedFiles,
      content,
      tags,
      title,
      files,
      thumbnail,
      desc,
      isPublished,
    }) => {
      const form = new FormData()

      const data = {
        content,
        tags: tags ?? [],
        title,
        files,
        thumbnail,
        desc,
        isPublished,
      }

      const hasThumbnail = attachedFiles?.item(0)
      if (hasThumbnail) {
        form.append('file', hasThumbnail, hasThumbnail!.name)
        form.append('path', FileUploadPath.TEMP)
        const thumbnailResponse = await uploadFile(form)
        data.thumbnail = thumbnailResponse.data
      }

      await createPost(data)
    }
  )

  const onSaveTemp = useCallback(() => {
    setValue('isPublished', false)
    onConfirm()
  }, [onConfirm, setValue])

  const onOpenSeoModal = handleSubmit(
    useCallback(async (values) => {
      delete values.tagInput
      setIsOpen(true)
    }, [])
  )

  useEffect(() => {
    return () => {
      setFocus('title')
    }
    // eslint-disable-next-line
  }, [])

  return (
    <LoginGuard>
      <PostWrite
        //
        register={register}
        onSubmit={onOpenSeoModal}
        formState={formState}
        onChange={onChangeEditor}
        tagFields={tagFields}
        onChangeTag={onChangeTag}
        onSaveTemp={onSaveTemp}
      />
      <SeoModal
        //
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        getValues={getValues}
        watch={watch}
        onConfirm={onConfirm}
        register={register}
        setValue={setValue}
      />
    </LoginGuard>
  )
}

export default PostWritePage
