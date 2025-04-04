import React from 'react'
import style from '@/components/Post/Post.module.css'
import { GetPostResponseDto } from '@/features/posts/api/dto/get-post.dto'
import PostTag from '@/components/Post/PostTag/PostTag'

export interface PostProps extends GetPostResponseDto {}

function Post({ author, title, tags, content, createdAt }: PostProps) {
  return (
    <article>
      <div className="flex flex-column gap-half">
        <h2 className={style.title}>{title}</h2>
        <div className="flex justify-between">
          <div>{author?.nickname}</div>
          <div className="text-gray-400">{createdAt}</div>
        </div>
        <ul className="flex gap-half">
          {tags?.map((tag) => <PostTag label={tag?.label} key={tag.id} />)}
        </ul>
      </div>

      <hr className={style.hr} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
}

export default Post
