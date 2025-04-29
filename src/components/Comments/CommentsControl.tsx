'use client'
import React from 'react'
import Button from '@/components/Button/Button'
import CloseIcon from '@/../public/icons/close.svg'
import EditIcon from '@/../public/icons/edit.svg'
import TrashCanIcon from '@/../public/icons/trashcan.svg'
import { Author } from '@/features/auth/types/auth.type'
import { useAppContext } from '@/components/Providers/hooks/useAppContext'

interface CommentsControlProps {
  author: Author
  onEdit: () => void
  onDelete: () => void
  isEdit?: boolean
}

function CommentsControl({
  author,
  isEdit,
  onEdit,
  onDelete,
}: CommentsControlProps) {
  const { user } = useAppContext()

  if (user?.id !== author.id) {
    return
  }

  return (
    <div className="flex gap-0 sm:gap-2 ">
      <Button className="icon-btn" onClick={onEdit}>
        <span className="hidden sm:inline">{isEdit ? '취소' : '수정'}</span>
        <span className="sm:hidden">
          {isEdit ? (
            <CloseIcon className="size-4" />
          ) : (
            <EditIcon className="size-4" />
          )}
        </span>
      </Button>

      <Button className="icon-btn text-red-600" onClick={onDelete}>
        <span className="hidden sm:inline">삭제</span>
        <span className="sm:hidden">
          <TrashCanIcon className="size-4" />
        </span>
      </Button>
    </div>
  )
}

export default CommentsControl
