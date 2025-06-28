'use client'
import React, { MouseEventHandler } from 'react'
import CloseIcon from '@/../public/icons/close.svg'
import Button from '@/components/Button/Button'
import { Tag } from '@/features/tags/types/tag.type'
import Link from 'next/link'
import route from '@/routes/routes'

export type PostTagData = Pick<Tag, 'label' | 'id'>
export interface PostTagProps extends PostTagData {
  onDelete?: MouseEventHandler<HTMLButtonElement>
  isEdit?: boolean
}

function PostTag({ label, onDelete, isEdit }: PostTagProps) {
  return (
    <li>
      <Link
        className={`flex items-center bg-black  text-white py-1 px-4 text-[0.8rem] whitespace-nowrap rounded-4xl h-8 gap-1 ${isEdit && 'cursor-text'}`}
        href={`${route.posts.index}?search=${label}`}
        onClick={(e) => isEdit && e.preventDefault()}
      >
        {label}
        {isEdit && (
          <Button
            className="bg-transparent hover:bg-gray-600 hover:rounded-4xl"
            onClick={onDelete}
          >
            <CloseIcon className="w-4 h-4 cursor-pointer stroke-2 [&>path]:stroke-white" />
          </Button>
        )}
      </Link>
    </li>
  )
}

export default PostTag
