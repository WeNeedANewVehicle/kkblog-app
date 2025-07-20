import React from 'react'
import { GetPostResponseDto } from '@/features/posts/api/dto/getPost.dto'
import PostTag from '@/features/posts/components/PostTag/PostTag'
import PostControl from '@/features/posts/components/PostControl/PostControl'
import 'ckeditor5/ckeditor5.css'

export interface PostProps
  extends Omit<GetPostResponseDto, 'updatedAt' | '_count'> {}

function Post({ author, title, tags, content, createdAt, id }: PostProps) {
  return (
    <article className="mt-40">
      <div className="flex flex-col gap-4 py-16">
        <h2 className="text-4xl md:text-6xl font-black">{title}</h2>
        <div className="flex justify-between">
          <div className="">{author?.nickname}</div>
          <div className="text-gray-400 dark:text-gray-600">{createdAt}</div>
        </div>

        <PostControl postId={id} author={author} />

        <ul className="flex flex-wrap gap-2">
          {tags?.map((tag) => <PostTag label={tag?.label} key={tag.id} />)}
        </ul>
      </div>

      <hr className="my-4 border-t border-t-gray-600" />

      <div
        className="pt-4 min-h-dvh max-w-7xl ck ck-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}

export default Post
