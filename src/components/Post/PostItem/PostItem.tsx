import { GetPostsItemResponseDto } from '@/features/posts/api/dto/get-post-list.dto'
import route from '@/routes/routes'
import Link from 'next/link'
import React from 'react'
import style from '@/components/Post/PostItem/PostItem.module.css'
import commonCss from '@/common/styles/common.module.css'
import utilCss from '@/common/styles/util.module.css'
import PostThumbnail from '@/components/Post/PostThumbnail/PostThumbnail'
import { combineCss } from '@/common/styles/comebineCss'
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
    <li className={`bg-gray-100 ${style.wrapper} shadow-2xs`}>
      <Link href={route.posts.detail(id)}>
        <PostThumbnail title={title} thumbnail={thumbnail} />

        <div className={`flex flex-col gap-half sm bg-gray-700 ${style.inner}`}>
          <h2
            className={combineCss(
              commonCss.textBlack,
              utilCss.noLf,
              utilCss.oneLf
            )}
          >
            {title}
          </h2>
          <p
            className={`overflow-hidden ${combineCss(style.desc, utilCss.threeLf)}`}
          >
            {desc ?? '콘텐츠에 미리보기 내용이 없습니다.'}
          </p>

          <div className={`flex justify-between text-gray-600 ${style.author}`}>
            <div>{author.nickname}</div>
            <div>{timeAgo(createdAt)}</div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default PostItem
