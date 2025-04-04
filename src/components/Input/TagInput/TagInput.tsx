import React, { forwardRef } from 'react'
import Input, { InputProps } from '@/components/Input/Input'
import PostTag, { PostTagProps } from '@/components/Post/PostTag/PostTag'
import {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from 'react-hook-form'
import { PostSchema } from '@/features/posts/schema/post.schema'
import styles from '@/components/Input/TagInput/TagInput.module.css'

interface TagsInputProps extends InputProps {
  fields: PostSchema['tags']
  remove: UseFieldArrayRemove
  append: UseFieldArrayAppend<PostSchema, 'tags'>
  isEdit?: PostTagProps['isEdit']
}

const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
  ({ fields, remove, append, isEdit, ...inputProps }, ref) => {
    return (
      <div className={`flex gap-half bg-white sm ${styles.wrapper}`}>
        {fields?.map((tag, index) => (
          <PostTag
            //
            key={tag?.id ?? index}
            label={tag.label}
            onDelete={() => remove(index)}
            isEdit={isEdit}
          />
        ))}

        <Input
          className={`flex border-none ${styles.input}`}
          {...inputProps}
          ref={ref}
          placeholder="태그 입력"
        />
      </div>
    )
  }
)

TagsInput.displayName = 'TagsInput'

export default TagsInput
