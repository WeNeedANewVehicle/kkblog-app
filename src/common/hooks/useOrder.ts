import { useSearchParams } from 'next/navigation'
import { OrderBy } from '../types/orderBy.type'

function useOrder() {
  const params = useSearchParams()

  return params.get('order') as OrderBy
}

export default useOrder
