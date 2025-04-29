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
import ShareButton from '@/components/Button/ShareButton/ShareButton'
import HorizontalLine from '@/components/Line/Horizontal'
import CommentSection from '@/components/Comments/CommentSection'
import NearByPosts from '@/components/Post/NearByPosts/NearByPosts'

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

    if (meta.status === HttpStatus.INTERNAL_SERVER_ERROR) {
      redirect(route.error)
    }

    redirect(route.error)
  }
}

async function Page({ params }: DynamicParam<'id'>) {
  const { id } = await params
  const { data: post, error, meta } = await getPostApi(id)

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
          thumbnail={post.thumbnail}
          createdAt={toReadableDate(post.createdAt)}
        />

        <div className="flex justify-end pt-10">
          <ShareButton />
        </div>
        <HorizontalLine className="border-t-gray-600" />

        <div className="flex flex-col gap-4 py-8">
          <h4 className="text-2xl">이전/다음 글</h4>
          <NearByPosts postId={id} />
        </div>
        <HorizontalLine className="border-t-gray-600" />
      </section>

      <CommentSection postId={post.id} commentCounts={post._count.comments}/>
    </div>
  )
}

export default Page
