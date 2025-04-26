import { queryOptions, useQuery } from '@tanstack/react-query'
import React from 'react'
import { getNearByPosts } from '@/features/posts/api/posts'

const GET_NEAR_BY_POST = 'GET_NEAR_BY_POST'

function useNearbyPostsQueryOptions(postId: string) {
  return queryOptions({
    queryKey: [GET_NEAR_BY_POST, { postId }],
    queryFn: () => getNearByPosts(postId),
    enabled: Boolean(postId),
  })
}

function useNearbyPosts(postId: string) {
  return useQuery(useNearbyPostsQueryOptions(postId))
}

export default useNearbyPosts
