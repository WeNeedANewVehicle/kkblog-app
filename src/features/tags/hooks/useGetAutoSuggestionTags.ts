import { useMutation, useQuery } from '@tanstack/react-query'
import { getAutoSuggestionTags } from '@/features/tags/api/tags.api'
import { GetAutoSuggestionTagDto } from '../api/dto/getAutoSuggestionTags.dto'

export const GET_AUTO_SUGGESTION_TAGS = 'GET_AUTO_SUGGESTION_TAGS'

function useGetAutoSuggestionTags(params: GetAutoSuggestionTagDto) {
  return useQuery({
    queryKey: [GET_AUTO_SUGGESTION_TAGS],
    queryFn: () => getAutoSuggestionTags(params),
    enabled: Boolean(params.search && params.search.length >= 2),
  })
}

export default useGetAutoSuggestionTags
