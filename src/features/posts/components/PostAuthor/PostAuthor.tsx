import React from 'react'
import Image from 'next/image'
import { DEFAULT_PROFILE_IMAGE } from '@/common/constant/constant'
import { GetPostResponseDto } from '@/features/posts/api/dto/getPost.dto'

interface PostAuthorProps {
  author: GetPostResponseDto['author']
}

function PostAuthor({ author }: PostAuthorProps) {
  return (
    <div className="flex gap-4">
      <Image
        className="aspect-square object-cover rounded-full border-gray-200 border-4 size-[8rem] md:size-[16rem]"
        src={author.image ?? DEFAULT_PROFILE_IMAGE}
        alt={`작성자 ${author.nickname}의 프로필 사진`}
        width={256}
        height={256}
      />

      <div className="flex flex-col gap-4 w-full">
        <div className="text-2xl md:text-4xl">{author?.nickname}</div>
        <div className="text-gray-600">
          {author.summary ?? '등록된 소개가 없습니다.'}
        </div>
      </div>
    </div>
  )
}

export default PostAuthor
