import React from 'react'
import style from '@/components/Post/PostThumbnail/PostThumbnail.module.css'
import { PostItemProps } from '@/components/Post/PostItem/PostItem'
import Image from 'next/image'
import ImageIcon from '@/../public/icons/image.svg'

type PostThumbnailProps = Pick<PostItemProps, 'thumbnail' | 'title'>

function PostThumbnail({ thumbnail, title }: PostThumbnailProps) {
  return (
    <div
      className={`flex justify-center items-center position-rel bg-white w-full ${style.thumbnail}`}
    >
      {thumbnail ? (
        <Image
          fill
          src={thumbnail}
          alt={`게시물 "${title}"의 썸네일 이미지가 보입니다.`}
        />
      ) : (
        <div
          className={`flex flex-column justify-center items-center bg-white ${style.noThumbnail}`}
        >
          <ImageIcon className={style.icon} />
          <p> 미리보기가 없습니다. </p>
        </div>
      )}
    </div>
  )
}

export default PostThumbnail
