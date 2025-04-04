import React, { MouseEventHandler } from 'react'
import CloseIcon from '@/../public/icons/close.svg'
import styles from '@/components/Post/PostTag/PostTag.module.css'
import Button from '@/components/Button/Button'
import { Tag } from '@/features/tags/types/tag.type'

export type PostTagData = Pick<Tag, 'label' | 'id'>
export interface PostTagProps extends PostTagData {
  onDelete?: MouseEventHandler<HTMLButtonElement>
  isEdit?: boolean
}

function PostTag({ label, onDelete, isEdit }: PostTagProps) {
  return (
    <li
      className={`flex items-center bg-black gap-half color-white ${styles.wrapper}`}
    >
      {label}
      {isEdit && (
        <Button className={styles.button} onClick={onDelete}>
          <CloseIcon className={styles.icon} />
        </Button>
      )}
    </li>
  )
}

export default PostTag
