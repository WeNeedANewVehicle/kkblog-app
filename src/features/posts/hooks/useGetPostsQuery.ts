'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { GetPostsDto } from '../api/dto/get-post-list.dto'

function useGetPostsQuery() {
  const params = useSearchParams()

  const result = params.toString()
  return result
}

export default useGetPostsQuery
