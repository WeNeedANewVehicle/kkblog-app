import React from 'react'
import { GetPostsItemResponseDto } from '../api/dto/get-post-list.dto'
import Image from 'next/image'
import LogoIcon from '@/../public/icons/logo.svg'

function PostListSummaryItem({
  title,
  createdAt,
  thumbnail,
}: GetPostsItemResponseDto) {
  return (
    <li className="flex justify-between items-center odd:border-t not-odd:border-b border-gray-600 py-2">
      <span className="flex gap-4 items-center">
        {thumbnail && (
          <Image
            className="size-12 object-cover"
            width={48}
            height={48}
            src={thumbnail}
            quality={100}
            sizes="192px"
            alt={`게시물 ${title}의 썸네일이 보입니다.`}
          />
        )}
        {!thumbnail && (
          <LogoIcon className="border p-2 border-gray-600 size-12" />
        )}
        <span className="w-fit line-clamp-1">
          {title}
        </span>
      </span>
      
      <span className="text-sm text-gray-600">{createdAt}</span>
    </li>
  )
}

export default PostListSummaryItem
