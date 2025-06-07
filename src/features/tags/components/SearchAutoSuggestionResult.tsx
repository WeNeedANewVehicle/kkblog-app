import PostTag from '@/components/Post/PostTag/PostTag'
import React from 'react'
import { GetAutoSuggestionTagsResponseDto } from '@/features/tags/api/dto/getAutoSuggestionTags.dto';

interface SearchAutoSuggestionResultProps {
  tags: GetAutoSuggestionTagsResponseDto;
  isCollapsed: boolean;
}

function SearchAutoSuggestionResult({ isCollapsed, tags }: SearchAutoSuggestionResultProps) {
  return (
  <div className={`flex flex-col border-2 dark:border-none dark:bg-gray-600 px-4 py-2.5 transition-transform origin-top transform-[scaleY(0%)] ${!isCollapsed && 'transform-[scaleY(100%)]'}`}>
      <div className={`flex flex-col gap-2`}>
        <h6 className="text-sm font-bold">
          {tags?.length ? `${tags.length}개 태그 검색됨` : '검색된 태그 없음' }
        </h6>
        <ul className="flex gap-2 flex-wrap">
          {tags.map(tag => <PostTag key={tag.label} label={tag.label} />)}
        </ul>
      </div>

      
    </div>
  )
}

export default React.memo(SearchAutoSuggestionResult);