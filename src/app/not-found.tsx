'use client'

import React, { useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
function NotFound() {
  const router = useRouter()

  const goBack = useCallback(() => {
    router.back()
  }, [router])
  return (
    <div className={'flex items-center justify-center h-screen flex-col'}>
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
        <h1
          className={
            'text-[4rem] font-bold text-center flex justify-around tracking-widest'
          }
        >
          404
        </h1>
        <h2 className={'text-center text-2xl mb-5'}>
          페이지를 찾을 수 없습니다.
        </h2>
        <button
          className={'w-full p-4 bg-white text-gray-800'}
          onClick={goBack}
        >
          돌아가기
        </button>
      </div>
    </div>
  )
}

export default NotFound
