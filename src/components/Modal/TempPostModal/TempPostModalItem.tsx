import Input from '@/components/Input/Input'
import { GetMyPostsItemResponseDto } from '@/features/posts/api/dto/getMyPosts.dto'
import React, { ChangeEvent } from 'react'
import { toReadableDate } from '@/common/util/time.util'

interface TempPostModalItemProps extends GetMyPostsItemResponseDto {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function TempPostModalItem({
  id,
  title,
  createdAt,
  onChange,
}: TempPostModalItemProps) {
  return (
    <li className="flex border flex-col p-2">
      <label>
        <div className="flex h-fit gap-2">
          <Input
            className="w-fit!"
            type="radio"
            name="temp-posts"
            value={id}
            onChange={onChange}
          />
          <div className="text-ellipsis line-clamp-1">{title}</div>
        </div>

        <div className="text-right text-[0.8rem] text-gray-600">
          작성일: {toReadableDate(createdAt)}
        </div>
      </label>
    </li>
  )
}

export default TempPostModalItem
