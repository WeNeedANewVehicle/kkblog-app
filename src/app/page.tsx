'use client'

import QueryError from '@/components/ErrorMessage/QueryError'
import MainArticle from '@/features/main/components/Article/MainArticle'
import PostListSummary from '@/features/posts/components/PostListSummary'
import Count from '@/features/statistics/components/Count'
import useIncreaseVisitor from '@/features/statistics/hooks/useIncreaseVisitor'
import useMainPageStatistics from '@/features/statistics/hooks/useMainPageStatistics'
import { useMemo } from 'react'

function Page() {
  useIncreaseVisitor()

  const [{ data: posts, error: postsError }, { data: statistics }] =
    useMainPageStatistics()

  const statisticsData = useMemo(() => statistics?.data, [statistics?.data])

  return (
    <section className="flex flex-col gap-4">
      <title>메인페이지 | 크크블로그</title>

      <MainArticle title="최신 글">
        <QueryError
          error={postsError}
          message={'글 목록을 가져오는데 실패했습니다.'}
        />
        {!postsError && <PostListSummary posts={posts?.data ?? []} />}
      </MainArticle>

      <MainArticle title="통계">
        <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 gap-4 md:grid-cols-4 md:grid-rows-1">
          <Count
            className="bg-blink sm:aspect-square max-sm:aspect-auto"
            text="새 포스팅"
            unit="개"
            count={statisticsData?.posts.today ?? 0}
          />
          <Count
            className="bg-red-500 sm:aspect-square max-sm:aspect-auto"
            text="전체 포스팅"
            unit="개"
            count={statisticsData?.posts.total ?? 0}
          />
          <Count
            className="bg-green-500 sm:aspect-square max-sm:aspect-auto"
            text="오늘 방문자"
            unit="명"
            count={statisticsData?.visitors.today ?? 0}
          />
          <Count
            className="bg-blue-500 sm:aspect-square max-sm:aspect-auto"
            text="전체 방문자"
            unit="명"
            count={statisticsData?.visitors.total ?? 0}
          />
        </div>
      </MainArticle>
    </section>
  )
}

export default Page
