'use client'

import LoginGuard from '@/components/Guard/LoginGuard'
import usePostForm from '@/features/posts/hooks/usePostForm'
import PostWrite from '@/components/Post/PostWrite/PostWrite'
import { useParams } from 'next/navigation'
import useGetPost from '@/features/posts/hooks/useGetPost'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useInitPost from '@/features/posts/hooks/useInitPost'
import { ClassicEditor } from 'ckeditor5'
import SeoModal from '@/components/Modal/SeoModal/SeoModal'
import useUploadFile from '@/features/files/hooks/useUploadFile'
import useUpdatePost from '@/features/posts/hooks/useUpdatePost'

function PostEditPage() {
  const [isOpen, setIsOpen] = useState(false)
  const { id } = useParams()
  const postId = useMemo(() => (Array.isArray(id) ? id[0] : id), [id])
  const { data } = useGetPost(postId)

  const { mutateAsync: uploadFile, isPending } = useUploadFile()

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
      const thumbnailResponse = await uploadFile(form)
      data.thumbnail = thumbnailResponse.data
    }

    await updatePost(data)
  })

  // 에디터 초기화
  const onEditorReady = useCallback(
    (e: ClassicEditor) => {
      if (data?.data.content) {
        e.setData(data?.data.content)
      }
    },
    [data]
  )

  useInitPost({
    reset,
    post: data?.data,
    id: postId,
  })

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
        formState={formState}
        onChangeEditor={onChangeEditor}
        onChangeTag={onChangeTag}
        onSubmit={() => {}}
        onReady={onEditorReady}
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
