import React from 'react'
import Select from '@/components/Select/Select'
import { commentOrder } from '@/common/constant/commentOrder'
import useCommentOrder from '@/features/comments/hooks/useCommentOrder'

function CommentsOrderOption() {
  const { order, onChange } = useCommentOrder()

  return (
    <Select
      //
      options={commentOrder}
      onChange={onChange}
      value={commentOrder.find((opt) => opt.value === order)?.value ?? ''}
    />
  )
}

export default React.memo(CommentsOrderOption)
