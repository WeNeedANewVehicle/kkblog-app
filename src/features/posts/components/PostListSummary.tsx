import React from 'react'
import { GetPostsResponseDto } from '../api/dto/getPostList.dto'
import PostListSummaryItem from './PostListSummaryItem'
import { timeAgo } from '@/common/util/time.util'
import route from '@/routes/routes'
import Link from 'next/link'

interface PostListSummaryProps {
  posts: GetPostsResponseDto
}

function PostListSummary({ posts }: PostListSummaryProps) {
  if (!posts?.length) {
    return (
      <ul>
        <li>등록된 게시물이 없습니다.</li>
      </ul>
    )
  }

  return (
    <>
      <ul className="border-b border-gray-600">
        {posts.map(({ title, createdAt, id, ...rest }) => (
          <Link key={id} href={route.posts.detail(id)}>
            <PostListSummaryItem
              id={id}
              title={title}
              createdAt={timeAgo(createdAt)}
              {...rest}
            />
          </Link>
        ))}
      </ul>
      <Link className="btn-black box-sm-wide" href={route.posts.index}>
        글 목록
      </Link>
    </>
  )
}

export default PostListSummary
