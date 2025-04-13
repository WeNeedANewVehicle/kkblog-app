import React from 'react'
import SearchIcon from '@/../public/icons/search.svg'
import CloseIcon from '@/../public/icons/close.svg'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'

interface SearchProps {}

function Search() {
  return (
    <div
      className={`flex relative items-center justify-center gap-2 w-full border-2 border-gray-800 dark:border-gray-600`}
    >
      <form className={`flex items-center gap-half w-full`}>
        <div className={`flex items-center pr-2 w-full`}>
          <Input type="search" className="border-none" placeholder="검색" />

          <Button className="icon-btn" type='button'>
            <CloseIcon className="icon interact-gray-icon" />
          </Button>
          <Button className="icon-btn" type='button'>
            <SearchIcon className="icon interact-gray-icon" />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Search
