'use client'
import Title from '@/components/WysiwygEditor/Title'
import useNavigation from '@/features/posts/hooks/useNavigation'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import Loading from '@/../public/icons/loading.svg'
import LoginGuard from '@/components/Guard/LoginGuard'
import Button from '@/components/Button/Button'

const DynamicWysiwygEditor = dynamic(
  () => import('@/components/WysiwygEditor/WysiwygEditor'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

function PostWritePage() {
  const { goBack } = useNavigation()
  return (
    <LoginGuard>
      <div className="flex flex-col h-full gap-4">
        <Title />

        <DynamicWysiwygEditor />

        <div className="flex gap-4 basis-8">
          <Button className="btn-md bg-warning" onClick={goBack}>
            돌아가기
          </Button>
          <Button className="btn-md bg-taupe">임시 저장</Button>
          <Button className="btn-md bg-taupe">작성</Button>
        </div>
      </div>
    </LoginGuard>
  )
}

export default PostWritePage
