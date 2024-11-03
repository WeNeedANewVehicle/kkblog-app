import WysiwygEditor from '@/components/WysiwygEditor/WysiwygEditor'
import route from '@/routes/routes'
import Link from 'next/link'
import React from 'react'

function PostsPage() {
  return (
    <div>
      <button>
        <Link href={route.posts.write}>글쓰기</Link>
      </button>
    </div>
  )
}

export default PostsPage
