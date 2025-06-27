'use client'

import LoginGuard from '@/components/Guard/LoginGuard'
import usePostForm from '@/features/posts/hooks/usePostForm'
import PostWrite from '@/components/Post/PostWrite/PostWrite'
import { useParams } from 'next/navigation'
import useGetMyPost from '@/features/posts/hooks/useGetMyPost'
import useGetMyPosts from '@/features/posts/hooks/useGetMyPosts'
import { useCallback, useMemo, useState } from 'react'
import useInitPost from '@/features/posts/hooks/useInitPost'
import SeoModal from '@/components/Modal/SeoModal/SeoModal'
import useUploadFile from '@/features/files/hooks/useUploadFile'
import useUpdatePost from '@/features/posts/hooks/useUpdatePost'
import { FileUploadPath } from '@/common/enum/uploadPath.enum'
import useLoadTempPosts from '@/features/posts/hooks/useLoadTempPosts'

function PostEditPage() {
  const { id } = useParams()
  const postId = useMemo(() => (Array.isArray(id) ? id[0] : id), [id])
  const { data: post } = useGetMyPost(postId)
  const { data: tempPosts } = useGetMyPosts({ published: false });
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
    setValue,
    watch,
  } = usePostForm()

  const { onOpenTempPostModal } = useLoadTempPosts()

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

  useInitPost({
    reset,
    id: postId,
    post: post?.data,
    setFocus,
  })

  return (
    <LoginGuard>
      <PostWrite
        //
        data={post?.data.content}
        onChange={onChangeEditor}
        formState={formState}
        onChangeTag={onChangeTag}
        onSubmit={onOpenSeoModal}
        register={register}
        tagFields={tagFields}
        onSaveTemp={onSaveTemp}
        onOpenTempPostModal={onOpenTempPostModal}
        tempPostCount={tempPosts?.data.length ?? 0}
      />
      <SeoModal
        //
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        register={register}
        getValues={getValues}
        watch={watch}
        onConfirm={onConfirm}
        setValue={setValue}
      />
    </LoginGuard>
  )
}

export default PostEditPage
