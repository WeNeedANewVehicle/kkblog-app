import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getAutoSuggestionTags } from '@/features/tags/api/tags.api';
import { GET_AUTO_SUGGESTION_TAGS } from './useGetAutoSuggestionTags';

export type UseMutateAutoSuggestionTagsReturnType = ReturnType<typeof useMutateAutoSuggestionTags>;
function useMutateAutoSuggestionTags() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getAutoSuggestionTags,
    onMutate: () => {

      queryClient.invalidateQueries({
        queryKey: [GET_AUTO_SUGGESTION_TAGS]
      })
    }
  })
}

export default useMutateAutoSuggestionTags