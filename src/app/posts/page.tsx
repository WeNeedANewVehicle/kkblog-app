'use client'
import Loading from '@/../public/icons/loading.svg'
import PostsPageContainer from '@/features/posts/container/PostsPageContainer'
import { Suspense } from 'react'

function PostsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PostsPageContainer />
    </Suspense>
  )
}

export default PostsPage
