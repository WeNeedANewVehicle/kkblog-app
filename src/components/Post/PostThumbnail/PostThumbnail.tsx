import React from 'react'
import { PostItemProps } from '@/components/Post/PostItem/PostItem'
import Image from 'next/image'
import ImageIcon from '@/../public/icons/image.svg'

type PostThumbnailProps = Pick<PostItemProps, 'thumbnail' | 'title'>

function PostThumbnail({ thumbnail, title }: PostThumbnailProps) {
  return (
    <div className="flex justify-center items-center relative bg-white dark:bg-gray-800 w-full overflow-hidden aspect-video">
      {thumbnail ? (
        <Image
          fill
          src={thumbnail}
          alt={`게시물 "${title}"의 썸네일 이미지가 보입니다.`}
          priority
          style={{ objectFit: 'cover', transition: 'transform' }}
        />
      ) : (
        <div
          className={`flex flex-col justify-center items-center bg-white dark:bg-gray-800 text-gray-600`}
        >
          <ImageIcon className="stroke-gray-600" width={100} height={'auto'} />
          <p> 미리보기가 없습니다. </p>
        </div>
      )}
    </div>
  )
}

export default PostThumbnail
