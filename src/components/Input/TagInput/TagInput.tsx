import React, { forwardRef } from 'react'
import Input, { InputProps } from '@/components/Input/Input'
import PostTag, { PostTagProps } from '@/components/Post/PostTag/PostTag'
import { UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form'
import { PostSchema } from '@/features/posts/schema/post.schema'

interface TagsInputProps extends InputProps {
  fields: PostSchema['tags']
  remove: UseFieldArrayRemove
  append: UseFieldArrayAppend<PostSchema, 'tags'>
  isEdit?: PostTagProps['isEdit']
}

const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
  ({ fields, remove, append, isEdit, ...inputProps }, ref) => {
    return (
      <div className={`flex flex-col gap-2 bg-white dark:bg-gray-900 `}>
        <ul className="flex gap-2 flex-wrap w-full">
          {fields?.map((tag, index) => (
            <PostTag
              //
              key={tag?.id ?? index}
              label={tag.label}
              onDelete={() => remove(index)}
              isEdit={isEdit}
            />
          ))}
        </ul>

        <Input
          className={`flex border-none p-0 w-fit border-2 border-gray-800`}
          {...inputProps}
          ref={ref}
          placeholder="태그를 입력하세요"
        />
      </div>
    )
  }
)

TagsInput.displayName = 'TagsInput'

export default TagsInput
