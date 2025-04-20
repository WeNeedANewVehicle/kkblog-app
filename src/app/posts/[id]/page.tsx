import { HttpStatus } from '@/common/enum/http-status.enum'
import { DynamicParam } from '@/common/types/dynamicParams.type'
import { DynamicSearchParams } from '@/common/types/searchParams.type'
import { toReadableDate } from '@/common/util/time.util'
import Post from '@/components/Post/Post'
import { getPostApi } from '@/features/posts/api/posts'
import { notFound, redirect } from 'next/navigation'
import { Metadata, ResolvingMetadata } from 'next'
import { ErrorBaseResponse } from '@/common/dto/baseResponse'
import route from '@/routes/routes'
import CommentForm from '@/components/Comments/CommentForm'
import CommentList from '@/components/Comments/CommentList'
import { getCommentsApi } from '@/features/comments/api/comments.api'
import ShareButton from '@/components/Button/ShareButton/ShareButton'

interface PostPageMetadata {
  params: DynamicParam<'id'>['params']
  searchParams: DynamicSearchParams
}

export async function generateMetadata(
  { params, searchParams }: PostPageMetadata,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params

  try {
    const { data } = await getPostApi(id)
    return {
      title: `${data.title} | 크크블로그`,
      description: data.content,
      openGraph: {
        type: 'article',
        description: data.desc ?? data.content,
        publishedTime: data.createdAt,
        title: data.title,
        siteName: '크크블로그',
        tags: data.tags.map((tag) => tag.label),
        modifiedTime: data.updatedAt,
      },
    }
  } catch (err) {
    const { meta } = err as unknown as ErrorBaseResponse

    if (meta.status === HttpStatus.NOT_FOUND) {
      return notFound()
    }

    redirect(route.error)
  }
}

async function Page({ params }: DynamicParam<'id'>) {
  const { id } = await params
  const { data: post, error, meta } = await getPostApi(id)
  const { data: comments } = await getCommentsApi({ postId: id })

  if (meta.status === HttpStatus.NOT_FOUND && !post) {
    notFound()
  }

  if (meta.status === HttpStatus.INTERNAL_SERVER_ERROR) {
    redirect(route.error)
  }

  return (
    <div>
      <section>
        <Post
          //
          author={post.author}
          id={post.id}
          title={post.title}
          tags={post.tags}
          content={post.content}
          createdAt={toReadableDate(post.createdAt)}
        />

        <div className="flex justify-end pt-10">
          <ShareButton />
        </div>

        <hr className="my-4 border-t border-t-gray-400" />
      </section>

      <section className="pt-8">
        <h4 className="text-3xl py-8">
          {' '}
          {post._count?.comments
            ? `${post._count.comments} 개의 댓글이 있습니다.`
            : '아직 등록된 댓글이 없습니다.'}
        </h4>
        <CommentForm postId={id} />
        <hr className="my-4 border-t border-t-gray-400" />
        <CommentList comments={comments} />
      </section>
    </div>
  )
}

export default Page
