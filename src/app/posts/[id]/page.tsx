import { HttpStatus } from '@/common/constant/constant'
import { DynamicParam } from '@/common/types/dynamicParams.type'
import { DynamicSearchParams } from '@/common/types/searchParams.type'
import { toReadableDate } from '@/common/util/time.util'
import Post from '@/components/Post/Post'
import { getPostApi } from '@/features/posts/api/posts'
import { notFound } from 'next/navigation'
import { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
  { params, searchParams }: PostPageMetadata,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params

  try {
    const { data, meta, error } = await getPostApi(id)
    return {
      title: `크크블로그 - ${data.title}`,
      description: data.content,
      openGraph: {
        type: 'article',
        description: data.content,
        publishedTime: data.createdAt,
        title: data.title,
        siteName: '크크블로그',
        tags: data.tags.map((tag) => tag.label),
        modifiedTime: data.updatedAt,
      },
    }
  } catch (err) {
    return notFound()
  }
}

interface PostPageMetadata {
  params: DynamicParam<'id'>['params']
  searchParams: DynamicSearchParams
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
