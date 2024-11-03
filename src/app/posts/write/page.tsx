'use client'
import Loading from '@/components/Loading/Loading'
import Title from '@/components/WysiwygEditor/Title'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DynamicWysiwygEditor = dynamic(
  () => import('@/components/WysiwygEditor/WysiwygEditor'),
  {
    ssr: false,
    loading: () => <Loading spinnerStroke="#847577" bgStroke="#A6A2A2" />,
  }
)

function PostWritePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-full">
      <Title />

      <DynamicWysiwygEditor />

      <div className="flex gap-4 basis-8">
        <button className="btn-md bg-warning" onClick={() => router.back()}>
          돌아가기
        </button>
        <button className="btn-md bg-taupe">임시 저장</button>
        <button className="btn-md bg-taupe">작성</button>
      </div>
    </div>
  )
}

export default PostWritePage
