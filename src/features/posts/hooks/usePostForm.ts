import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { PostSchema, postSchema } from '@/features/posts/schema/post.schema'
import { stripHtmlTags } from '@/common/regexps/regexps'
import { WysiwygEditorProps } from '@/components/WysiwygEditor/WysiwygEditor'
import { ChangeEvent, useCallback } from 'react'

function usePostForm() {
  const {
    control,
    formState,
    handleSubmit,
    register,
    setValue,
    setFocus,
    watch,
    getValues,
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: '',
      desc: '',
      files: [],
      tagInput: '',
      tags: [],
      title: '',
      id: undefined,
    },
  })

  const tagFields = useFieldArray({
    control,
    name: 'tags',
  })

  const fileFields = useFieldArray({
    control,
    name: 'files',
  })

  const onChangeEditor: WysiwygEditorProps['onChange'] = useCallback(
    (_, editor) => {
      setValue('content', editor.getData())
      const text = editor
        .getData()
        .replace(stripHtmlTags, '')
        .trim()
        .slice(0, 300)
      setValue('desc', text)
    },
    [setValue]
  )

  const onChangeTag = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      const isExist = tagFields.fields.find((tag) => tag.label === value)

      if (isExist) {
        alert('같은 이름의 태그가 있습니다.')
        return (e.target.value = '')
      }

      const isEmpty = value.trim() === ','

      if (e.target.value.endsWith(',') && !isEmpty) {
        tagFields.append({
          label: e.target.value.slice(0, -1),
          id: undefined,
        })
        e.target.value = ''
      }
    },
    [tagFields]
  )

  return {
    isValid: formState.isValid,
    isLoading: formState.isLoading,
    isSubmitting: formState.isSubmitting,
    errors: formState.errors,
    onChangeEditor,
    onChangeTag,
    handleSubmit,
    register,
    tagFields,
    fileFields,
    setValue,
    setFocus,
    getValues,
    watch,
  }
}

export default usePostForm
