import React, { PropsWithChildren, useCallback } from 'react'
import Button from '@/components/Button/Button'
import { FetchNextPageOptions } from '@tanstack/react-query'

interface CursorPagingButtonProps extends PropsWithChildren {
  hasNextPage: boolean
  isLoading: boolean
  fetchNextPage: (options?: FetchNextPageOptions) => unknown
}

function CursorPagingButton({
  hasNextPage,
  fetchNextPage,
  isLoading,
  children,
}: CursorPagingButtonProps) {
  const onClick = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, fetchNextPage])

  return (
    <Button
      className="btn-black box-sm"
      onClick={onClick}
      isLoading={isLoading}
      disabled={isLoading || !hasNextPage}
    >
      {children}
    </Button>
  )
}

export default CursorPagingButton
