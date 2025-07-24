'use client'

import React, { useCallback, useEffect, useState } from 'react'
import LoginGuard from '@/components/Guard/LoginGuard'
import usePostForm from '@/features/posts/hooks/usePostForm'
import useCreatePost from '@/features/posts/hooks/useCreatePost'
import SeoModal from '@/components/Modal/SeoModal/SeoModal'
import useUploadFile from '@/features/files/hooks/useUploadFile'
import PostWrite from '@/features/posts/components/PostWrite/PostWrite'
import { FileUploadPath } from '@/common/enum/uploadPath.enum'
import useBeforeUnload from '@/common/hooks/useBeforeUnload'
import useLoadTempPosts from '@/features/posts/hooks/useLoadTempPosts'
import useUploadedFilePath from '@/features/files/hooks/useUploadedFilePath'

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
  const { uploadedFilePath } = useUploadedFilePath()

  const onUpload = handleSubmit(
    async ({ attachedFiles, content, tags, title, files, thumbnail, desc }) => {
      const data = {
        content,
        tags: tags ?? [],
        title,
        files,
        thumbnail,
        desc,
      }

      const file = attachedFiles?.item(0)
      if (file) {
        data.thumbnail = await uploadedFilePath(file)
      }

      await createPost(
        { ...data, isPublished: true },
        { onSuccess: () => setIsOpen(false) }
      )
    }
  )

  const onUploadTemp = handleSubmit(
    async ({ attachedFiles, content, tags, title, files, thumbnail, desc }) => {
      const data = {
        content,
        tags: tags ?? [],
        title,
        files,
        thumbnail,
        desc,
      }

      const file = attachedFiles?.item(0)
      if (file) {
        data.thumbnail = await uploadedFilePath(file)
      }

      await createPost(
        { ...data, isPublished: false },
        { onSuccess: () => setIsOpen(false) }
      )
    }
  )

  const onOpenSeoModal = handleSubmit(
    useCallback(async (values) => {
      delete values.tagInput
      setIsOpen(true)
    }, [])
  )

  const { onOpenTempPostModal, tempPosts } = useLoadTempPosts()

  useBeforeUnload()

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
        onSaveTemp={onUploadTemp}
        tempPostCount={tempPosts?.data.length ?? 0}
        onOpenTempPostModal={onOpenTempPostModal}
      />
      <SeoModal
        //
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        getValues={getValues}
        watch={watch}
        onConfirm={onUpload}
        register={register}
        setValue={setValue}
      />
    </LoginGuard>
  )
}

export default PostWritePage
