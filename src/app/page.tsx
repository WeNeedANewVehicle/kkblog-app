'use client'
import Count from '@/features/statistics/components/Count'

function Page() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <title>메인페이지 | 크크블로그</title>

        <article className="flex flex-col gap-4">
          <h2 className="text-2xl">크크블로그 - 통계</h2>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <Count className="bg-blink" text="새 포스팅" unit="개" count={5} />
            <Count
              className="bg-red-500"
              text="전체 포스팅"
              unit="개"
              count={5}
            />
            <Count
              className="bg-green-500"
              text="오늘 방문자"
              unit="명"
              count={5}
            />
            <Count
              className="bg-blue-500"
              text="전체 방문자"
              unit="명"
              count={5}
            />
          </div>
        </article>
      </section>
    </>
  )
}

export default Page
