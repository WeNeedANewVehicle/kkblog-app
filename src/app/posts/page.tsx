import Search from '@/components/Search/Search'
import route from '@/routes/routes'
import Link from 'next/link'
import React from 'react'
import styles from '@/app/posts/page.module.css'

function PostsPage() {
  return (
    <section className="flex flex-column items-center justify-center gap-2">
      <Search />

      <div className="flex w-full justify-end">
        <Link href={route.posts.write} className={`sm ${styles.write}`} >
          글쓰기
        </Link>
      </div>
    </section>
  )
}

export default PostsPage
