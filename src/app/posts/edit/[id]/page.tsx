'use client'

import LoginGuard from '@/components/Guard/LoginGuard'
import usePostForm from '@/features/posts/hooks/usePostForm'
import PostWrite from '@/components/Post/PostWrite/PostWrite'
import { useParams } from 'next/navigation'
import useGetPost from '@/features/posts/hooks/useGetPost'
import { useCallback, useMemo, useState } from 'react'
import useInitPost from '@/features/posts/hooks/useInitPost'
import SeoModal from '@/components/Modal/SeoModal/SeoModal'
import useUploadFile from '@/features/files/hooks/useUploadFile'
import useUpdatePost from '@/features/posts/hooks/useUpdatePost'
import { FileUploadPath } from '@/common/enum/uploadPath.enum'

function PostEditPage() {
  const { id } = useParams()
  const postId = useMemo(() => (Array.isArray(id) ? id[0] : id), [id])
  const { data } = useGetPost(postId)
  const {
    //
    fileFields,
    formState,
    handleSubmit,
    onChangeEditor,
    onChangeTag,
    register,
    setFocus,
    reset,
    tagFields,
    getValues,
    watch,
  } = usePostForm()

  const [isOpen, setIsOpen] = useState(false)
  const { mutateAsync: uploadFile, isPending } = useUploadFile()

  const { mutateAsync: updatePost } = useUpdatePost(postId)

  const onConfirm = handleSubmit(async (values) => {
    const attachedFiles = values.attachedFiles?.item(0)
    const form = new FormData()

    const data = {
      content: values.content,
      tags: values?.tags ?? [],
      title: values.title,
      files: values.files,
      thumbnail: values.thumbnail,
      desc: values.desc,
    }

    if (attachedFiles) {
      form.append('file', attachedFiles, attachedFiles.name)
      form.append('path', FileUploadPath.TEMP)
      const thumbnailResponse = await uploadFile(form)
      data.thumbnail = thumbnailResponse.data
    }

    await updatePost(data)
  })

  const onOpenSeoModal = handleSubmit(
    useCallback(async (values) => {
      delete values.tagInput
      setIsOpen(true)
    }, [])
  )

  useInitPost({
    reset,
    id: postId,
    post: data?.data,
    setFocus,
  })

  return (
    <LoginGuard>
      <PostWrite
        //
        data={data?.data.content}
        onChange={onChangeEditor}
        formState={formState}
        onChangeTag={onChangeTag}
        onSubmit={onOpenSeoModal}
        register={register}
        tagFields={tagFields}
      />
      <SeoModal
        //
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        register={register}
        getValues={getValues}
        watch={watch}
        onConfirm={onConfirm}
      />
    </LoginGuard>
  )
}

export default PostEditPage
