import { GetPostsItemResponseDto } from '@/features/posts/api/dto/getPostList.dto'
import route from '@/routes/routes'
import Link from 'next/link'
import React from 'react'
import PostThumbnail from '@/components/Post/PostThumbnail/PostThumbnail'
import { timeAgo } from '@/common/util/time.util'

export interface PostItemProps extends GetPostsItemResponseDto {}

function PostItem({
  createdAt,
  id,
  title,
  thumbnail,
  desc,
  author,
}: PostItemProps) {
  return (
    <li
      className={`shadow-2xl [&>a>div>img]:scale-100 hover:[&>a>div>img]:scale-110`}
    >
      <Link href={route.posts.detail(id)}>
        <PostThumbnail title={title} thumbnail={thumbnail} />

        <div className="flex flex-col justify-between p-4 bg-gray-100 aspect-video dark:bg-gray-700">
          <div className="flex flex-col gap-2">
            <h2 className="line-clamp-1">{title}</h2>
            <p className="line-clamp-3 text-gray-500">
              {desc?.trim() ? desc : '콘텐츠에 미리보기 내용이 없습니다.'}
            </p>
          </div>

          <div className={`flex justify-between text-gray-600`}>
            <div>{author?.nickname}</div>
            <div>{timeAgo(createdAt)}</div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default PostItem
