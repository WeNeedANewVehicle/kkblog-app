'use client'
import useNavigation from '@/features/posts/hooks/useNavigation'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import Loading from '@/../public/icons/loading.svg'
import LoginGuard from '@/components/Guard/LoginGuard'
import Button from '@/components/Button/Button'
import LabeledText from '@/components/Input/LabeledInput/LabeledInput'
import Input from '@/components/Input/Input'
import Link from 'next/link'
import route from '@/routes/routes'

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
      <div className="flex flex-column flex-1 gap-1">
        <div>
          <LabeledText label="제목">
            <Input />
          </LabeledText>
        </div>
        
        <div className='flex flex-column flex-1 gap-half '>
          <h2>내용</h2>
          <DynamicWysiwygEditor />
        </div>

        <div className="flex gap-1">
          <Link className='sm flex items-center bg-gray-100 color-gray-200' href={route.posts.index}>
            돌아가기
          </Link>
          <Button size="sm">임시 저장</Button>
          <Button size="sm" className='bg-black color-white'>작성</Button>
        </div>
      </div>
    </LoginGuard>
  )
}

export default PostWritePage
