'use client'

import Button from '@/components/Button/Button'
import { useAppContext } from '@/components/Providers/hooks/useAppContext'
import { GetPostResponseDto } from '@/features/posts/api/dto/get-post.dto'
import route from '@/routes/routes'
import Link from 'next/link'
import React from 'react'

interface PostControlProps {
  postId: string
  author: GetPostResponseDto['author']
}

function PostControl({ postId, author }: PostControlProps) {
  const { user } = useAppContext()

  if (!user || user?.id !== author.id) {
    return
  }

  return (
    <div className="flex justify-end">
      <Link
        className="text-base dark:text-white hover:bg-gray-200 hover:text-black box-sm"
        href={route.posts.edit(postId)}
      >
        수정
      </Link>
      <Button className="text-base box-sm hover:bg-burgundy-100 text-red-600">
        삭제
      </Button>
    </div>
  )
}

export default PostControl
