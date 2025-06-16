import api from '@/common/util/api.util'
import objectToQueryString from '@/common/util/objectToQueryString'
import {
  GetAutoSuggestionTagDto,
  GetAutoSuggestionTagsResponseDto,
} from '@/features/tags/api/dto/getAutoSuggestionTags.dto'

export async function getAutoSuggestionTags(params: GetAutoSuggestionTagDto) {
  return await api<undefined, GetAutoSuggestionTagsResponseDto>({
    url: `/board/tags`,
    queries: objectToQueryString(params),
  })
}
