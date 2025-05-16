import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { increaseVisitorApi } from '@/features/statistics/api/statistics.api';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
export const INCREATE_VISITOR = 'INCREASE_VISITOR';

function useIncreaseVisitor() {
  const pathname = usePathname();

  return useQuery({
    queryKey: [INCREATE_VISITOR],
    queryFn: () => increaseVisitorApi(),
    enabled: Boolean(pathname),
  })
}

export default useIncreaseVisitor