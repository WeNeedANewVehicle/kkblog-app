import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { PostSchema, postSchema } from '@/features/posts/schema/post.schema'

function usePostForm() {
  const { control, formState, handleSubmit, register, watch, setValue } =
    useForm<PostSchema>({
      resolver: zodResolver(postSchema),
      mode: 'all',
    })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  console.log('values:', watch())

  return {
    isValid: formState.isValid,
    isLoading: formState.isLoading,
    isSubmitting: formState.isSubmitting,
    errors: formState.errors,
    handleSubmit,
    register,
    fields,
    append,
    remove,
    setValue,
  }
}

export default usePostForm
