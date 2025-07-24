'use client'

import LoginGuard from '@/components/Guard/LoginGuard'
import usePostForm from '@/features/posts/hooks/usePostForm'
import PostWrite from '@/features/posts/components/PostWrite/PostWrite'
import { useParams } from 'next/navigation'
import useGetMyPost from '@/features/posts/hooks/useGetMyPost'
import useGetMyPosts from '@/features/posts/hooks/useGetMyPosts'
import { useCallback, useMemo, useState } from 'react'
import useInitPost from '@/features/posts/hooks/useInitPost'
import SeoModal from '@/components/Modal/SeoModal/SeoModal'
import useUploadedFilePath from '@/features/files/hooks/useUploadedFilePath'
import useUpdatePost from '@/features/posts/hooks/useUpdatePost'
import { FileUploadPath } from '@/common/enum/uploadPath.enum'
import useLoadTempPosts from '@/features/posts/hooks/useLoadTempPosts'

function PostEditPage() {
  const { id } = useParams()
  const postId = useMemo(() => (Array.isArray(id) ? id[0] : id), [id])
  const { data: post } = useGetMyPost(postId)
  const { data: tempPosts } = useGetMyPosts({ published: false })
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
  const { uploadedFilePath } = useUploadedFilePath()
  const { mutateAsync: updatePost } = useUpdatePost(postId)

  const onUpload = handleSubmit(async (values) => {
    const data = {
      content: values.content,
      tags: values?.tags ?? [],
      title: values.title,
      files: values.files,
      thumbnail: values.thumbnail,
      desc: values.desc,
    }

    const file = values.attachedFiles?.item(0)
    if (file) {
      data.thumbnail = await uploadedFilePath(file)
    }

    await updatePost({ ...data, isPublished: true })
  })

  const onUploadTemp = handleSubmit(async (values) => {
    const data = {
      content: values.content,
      tags: values?.tags ?? [],
      title: values.title,
      files: values.files,
      thumbnail: values.thumbnail,
      desc: values.desc,
    }

    const file = values.attachedFiles?.item(0)
    if (file) {
      data.thumbnail = await uploadedFilePath(file)
    }

    await updatePost({ ...data, isPublished: false })
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
        onSaveTemp={onUploadTemp}
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
        onConfirm={onUpload}
        setValue={setValue}
      />
    </LoginGuard>
  )
}

export default PostEditPage
