'use client'
import React from 'react'
import Button from '@/components/Button/Button'
import EditIcon from '@/../public/icons/edit.svg'
import TrashCanIcon from '@/../public/icons/trashcan.svg'
import { Author } from '@/features/auth/types/auth.type'
import { useAppContext } from '../Providers/hooks/useAppContext'

interface CommentsControlProps {
  author: Author
}

function CommentsControl({ author }: CommentsControlProps) {
  const { user } = useAppContext()

  if (user?.id !== author.id) {
    return
  }

  return (
    <div className="flex gap-0 sm:gap-2 ">
      <Button className="icon-btn">
        <span className="hidden sm:inline">수정</span>
        <span className="sm:hidden">
          <EditIcon className="size-4" />
        </span>
      </Button>

      <Button className="icon-btn text-red-600">
        <span className="hidden sm:inline">삭제</span>
        <span className="sm:hidden">
          <TrashCanIcon className="size-4" />
        </span>
      </Button>
    </div>
  )
}

export default CommentsControl
