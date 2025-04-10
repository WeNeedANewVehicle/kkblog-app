'use client'

import React, { useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import route from '@/routes/routes'

function NotFound() {
  const router = useRouter()

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <div className="flex flex-1 justify-center">
      <div className={'flex flex-column justify-center self-center'}>
        <title>페이지를 찾을 수 없습니다. | 크크블로그</title>

        <div>
          <Image
            src={'/images/404.png'}
            alt={'404 - Not Found'}
            width={300}
            height={300}
            style={{
              width: 'auto',
              aspectRatio: 'auto',
            }}
            priority
          />
          <h1 className={'flex justify-center lg'}>404</h1>
          <h2 className={'text-center text-2xl mb-5'}>
            페이지를 찾을 수 없습니다.
          </h2>

          <div className="flex flex-column gap-half">
            <button
              className={'flex justify-center w-full color-white bg-black sm'}
              onClick={goBack}
            >
              돌아가기
            </button>
            <Link
              href={route.index}
              className="flex justify-center w-full color-white bg-black sm"
            >
              메인으로
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
