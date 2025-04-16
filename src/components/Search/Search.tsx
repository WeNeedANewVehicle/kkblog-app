import React, { useCallback, useRef, FormEvent } from 'react'
import SearchIcon from '@/../public/icons/search.svg'
import CloseIcon from '@/../public/icons/close.svg'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import { useRouter } from 'next/navigation'

interface SearchProps {}

function Search() {
  const router = useRouter()

  const ref = useRef<HTMLInputElement>(null)

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    router.replace('', {
      scroll: false,
    })
  }, [])

  return (
    <div
      className={`flex relative items-center justify-center gap-2 w-full border-2 border-gray-800 dark:border-gray-600`}
    >
      <form className={`flex items-center gap-half w-full`} onSubmit={onSubmit}>
        <div className={`flex items-center pr-2 w-full`}>
          <Input
            type="search"
            className="border-none"
            placeholder="태그나 검색어를 입력해주세요."
            ref={ref}
          />

          <Button className="icon-btn" type="button">
            <CloseIcon className="icon interact-gray-icon" />
          </Button>
          <Button className="icon-btn" type="submit">
            <SearchIcon className="icon interact-gray-icon" />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Search
