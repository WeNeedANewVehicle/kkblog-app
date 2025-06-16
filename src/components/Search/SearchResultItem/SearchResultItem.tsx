import { GetPostsItemResponseDto } from '@/features/posts/api/dto/getPostList.dto'
import React from 'react'

interface SearchResultItemProps extends GetPostsItemResponseDto {}

function SearchResultItem({}: SearchResultItemProps) {
  return <li></li>
}

export default SearchResultItem
