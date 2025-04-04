import { GetPostsItemResponseDto } from '@/features/posts/api/dto/get-post-list.dto'
import route from '@/routes/routes'
import Link from 'next/link'
import React from 'react'
import style from '@/components/Post/PostItem/PostItem.module.css'
import commonCss from '@/common/styles/common.module.css'
import utilCss from '@/common/styles/util.module.css'

import ImageIcon from '@/../public/icons/image.svg'

interface PostItemProps extends GetPostsItemResponseDto {}

function PostItem({ content, createdAt, id, tags, title }: PostItemProps) {
  return (
    <li className={style.wrapper}>
      <Link href={route.posts.detail(id)}>
        <ImageIcon className={style.icon} />
        <h2
          className={`${style.title} ${commonCss.textBlack} ${utilCss.noLineFeed} ${utilCss.oneLine}`}
        >
          {title}
        </h2>
      </Link>
    </li>
  )
}

export default PostItem
