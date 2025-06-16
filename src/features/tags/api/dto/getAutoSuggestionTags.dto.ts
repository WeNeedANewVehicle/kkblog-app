import { Tag } from '@/features/tags/types/tag.type'

export interface GetAutoSuggestionTagDto {
  search: Tag['label'] | null
}
export type GetAutoSuggestionTagsResponseDto = Array<Pick<Tag, 'label'>>
