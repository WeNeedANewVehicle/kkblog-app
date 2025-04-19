import React from 'react'
import { GetPostResponseDto } from '@/features/posts/api/dto/get-post.dto'
import PostTag from '@/components/Post/PostTag/PostTag'
import Button from '../Button/Button'
import Link from 'next/link'
import route from '@/routes/routes'

export interface PostProps extends Omit<GetPostResponseDto, 'updatedAt'> {}

function Post({ author, title, tags, content, createdAt, id }: PostProps) {

  return (
    <article className="mt-40">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl">{title}</h2>
        <div className="flex justify-between">
          <div>{author?.nickname}</div>
          <div className="text-gray-400 dark:text-gray-600">{createdAt}</div>
        </div>

        <div className="flex justify-end">
          <Link className="text-base dark:text-white hover:bg-gray-200 hover:text-black box-sm" href={route.posts.edit(id)}>
            수정
          </Link>
          <Button className="text-base box-sm hover:bg-burgundy-100 text-burgundy-600">삭제</Button>
        </div>

        <ul className="flex gap-2">
          {tags?.map((tag) => <PostTag label={tag?.label} key={tag.id} />)}
        </ul>
      </div>

      <hr className="my-4 border-t border-t-gray-400" />

      <div
        className="pt-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}

export default Post
