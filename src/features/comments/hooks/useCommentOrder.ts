import { commentOrder } from '@/common/constant/commentOrder'
import useOrder from '@/common/hooks/useOrder'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useCallback, useEffect } from 'react'

function useCommentOrder() {
  const router = useRouter()
  const order = useOrder()

  const changeUrl = useCallback(
    (value: string) => {
      if (!value) {
        return router.replace(`?order=${commentOrder[1].value}`, {
          scroll: false,
        })
      }

      router.replace(`?order=${value}`, {
        scroll: false,
      })
    },
    [router]
  )

  // Select 옵션 변경 시 URL에 이를 동기화
  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => changeUrl(e.target.value),
    [changeUrl]
  )

  useEffect(() => {
    if (!order) {
      return
    }

    changeUrl(order)
  }, [order, changeUrl])

  return { order, onChange }
}

export default useCommentOrder
