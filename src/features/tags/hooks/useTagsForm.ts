import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { tagSchema } from '@/features/tags/schema/tag.schema'

function useTagsForm() {
  const { control, formState, register } = useForm({
    resolver: zodResolver(tagSchema),
  })

  return {
    control,
    isValid: formState.isValid,
    register,
  }
}

export default useTagsForm
