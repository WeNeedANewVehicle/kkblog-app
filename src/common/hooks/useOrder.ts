import { useSearchParams } from 'next/navigation'
import { OrderBy } from '../types/orderBy.type'
import { ORDER_BY } from '../constant/constant'

/** query 파라미터 order 를 제어하고 가져오기 위한 훅
 * @param {OrderBy} defaultValue
 */
function useOrder(defaultValue: OrderBy = ORDER_BY.DESC): OrderBy {
  const params = useSearchParams()

  const order = params.get('order')

  if (!order) {
    return defaultValue
  }

  if (order !== 'asc' && order !== 'desc') {
    return defaultValue
  }

  return order as OrderBy
}

export default useOrder
