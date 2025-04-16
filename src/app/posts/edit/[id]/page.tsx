'use client'

import LoginGuard from '@/components/Guard/LoginGuard'
import usePostForm from '@/features/posts/hooks/usePostForm'
import PostWrite from '@/components/Post/PostWrite/PostWrite'
import { useParams } from 'next/navigation'
import useGetPost from '@/features/posts/hooks/useGetPost'
import { IdParam } from '@/common/types/idParam.type'
import { useCallback, useMemo } from 'react'
import useInitPost from '@/features/posts/hooks/useInitPost'
import { ClassicEditor } from 'ckeditor5'

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
    watch,
  } = usePostForm()

  const onEditorReady = useCallback(
    (e: ClassicEditor) => {
      if (data?.data) {
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
    </LoginGuard>
  )
}

export default PostEditPage
