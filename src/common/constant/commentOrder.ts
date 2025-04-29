import { ORDER_BY } from '@/common/constant/constant'

export const commentOrder = [
  {
    label: '정렬 순서',
    value: '',
    disabled: true,
    hidden: true,
  },
  { label: '최신순', value: ORDER_BY.DESC },
  { label: '작성순', value: ORDER_BY.ASC },
]
