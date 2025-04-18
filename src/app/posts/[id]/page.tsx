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

  if (meta.status === HttpStatus.NOT_FOUND && !post) {
    notFound()
  }

  if (meta.status === HttpStatus.INTERNAL_SERVER_ERROR) {
    throw new Error('Server error occurred')
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
      </section>

      <section>{/* COMMENTS */}</section>
    </div>
  )
}

export default Page
