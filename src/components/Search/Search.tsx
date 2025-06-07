'use client'

import React, { FormEvent } from 'react'
import SearchIcon from '@/../public/icons/search.svg'
import CloseIcon from '@/../public/icons/close.svg'
import Button from '@/components/Button/Button'
import Input, { InputProps } from '@/components/Input/Input'
import { PostSearchSchema } from '@/features/posts/schema/postSearch.schema'
import { FormState, UseFormRegister } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { UseMutateAutoSuggestionTagsReturnType } from '@/features/tags/hooks/useMutateAutoSuggestionTags'

interface SearchProps extends InputProps {
  register: UseFormRegister<PostSearchSchema>
  onSubmitForm: (e: FormEvent<HTMLFormElement>) => Promise<void>
  onClear: () => void
  formState: FormState<PostSearchSchema>
}

function Search({ register, onSubmitForm, onClear, onFocus, onBlur, onChange, formState }: SearchProps) {
  const searchError = formState.errors.search

  return (
    <div className="w-full flex flex-col gap-1">
      <ErrorMessage message={searchError?.message} />
      <div
        className={`flex border-2 border-gray-800 dark:border-gray-600 relative items-center justify-center gap-2 w-full ${searchError && 'error-border'}`}
      >
        <form
          className={`flex items-center gap-half w-full`}
          onSubmit={onSubmitForm}
        >
          <div className={`flex items-center pr-2 w-full`}>
            <Input
              type="search"
              className="border-none"
              placeholder="태그나 검색어를 입력해주세요."
              {...register('search', { onChange })}
              onFocus={onFocus}
              onBlur={onBlur}
            />

            <Button className="icon-btn" type="button" onClick={onClear}>
              <CloseIcon className="icon interact-gray-icon" />
            </Button>
            <Button className="icon-btn" type="submit">
              <SearchIcon className="icon interact-gray-icon" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default React.memo(Search)
