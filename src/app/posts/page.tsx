'use client'

import Link from 'next/link'
import React, { useMemo } from 'react'
import styles from '@/app/posts/page.module.css'
import buttonCss from '@/common/styles/button.module.css'
import Search from '@/components/Search/Search'
import route from '@/routes/routes'
import useGetPosts from '@/features/posts/hooks/useGetPosts'
import PostItem from '@/components/Post/PostItem/PostItem'

function PostsPage() {
  const { data: posts } = useGetPosts()

  const postList = useMemo(() => posts?.data ?? [], [posts?.data])
  return (
    <section className="flex flex-column items-center justify-center gap-2">
      <Search />

      <div className="flex w-full justify-end">
        <Link href={route.posts.write} className={`sm ${buttonCss.black}`}>
          글쓰기
        </Link>
      </div>

      <ul className={`${styles.postList} w-full gap-1`}>
        {postList.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </ul>
    </section>
  )
}

export default PostsPage
