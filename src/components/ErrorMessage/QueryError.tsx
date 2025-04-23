'use client'

import React from 'react'
import Button from '@/components/Button/Button'
import { ErrorBaseResponse } from '@/common/dto/baseResponse'

interface QueryErrorProps {
  message: string
  error: ErrorBaseResponse | null
}

function QueryError({ message, error }: QueryErrorProps) {
  if (!error) {
    return
  }

  return (
    <div className="flex flex-col flex-1 gap-4 self-center justify-center items-center text-center">
      <span className="text-8xl">😢</span>
      <p>{message}</p>
      <Button
        className="btn-black box-sm btn-icon"
        onClick={() => window.location.reload()}
      >
        새로고침
      </Button>
    </div>
  )
}

export default QueryError
