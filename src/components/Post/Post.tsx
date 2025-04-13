import React from 'react'
import style from '@/components/Post/Post.module.css'
import { GetPostResponseDto } from '@/features/posts/api/dto/get-post.dto'
import PostTag from '@/components/Post/PostTag/PostTag'
import Button from '../Button/Button'
import Link from 'next/link'
import route from '@/routes/routes'

export interface PostProps extends Omit<GetPostResponseDto, 'updatedAt'> {}

function Post({ author, title, tags, content, createdAt, id }: PostProps) {
  return (
    <article className={style.wrapper}>
      <div className="flex flex-col gap-4">
        <h2 className={style.title}>{title}</h2>
        <div className="flex justify-between">
          <div>{author?.nickname}</div>
          <div className="text-gray-400 dark:text-gray-600">{createdAt}</div>
        </div>

        <div className="flex justify-end gap-half">
          <Link className={style.edit} href={route.posts.edit(id)}>
            수정
          </Link>
          <Button className={style.delete}>삭제</Button>
        </div>

        <ul className="flex gap-half">
          {tags?.map((tag) => <PostTag label={tag?.label} key={tag.id} />)}
        </ul>
      </div>

      <hr className={style.hr} />

      <div
        className={style.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}

export default Post
