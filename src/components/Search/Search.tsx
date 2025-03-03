import React from 'react'
import SearchIcon from '@/../public/icons/search.svg'

import './Search.css'

function Search() {
  return (
    <div className="flex items-center gap-2">
      <select>
        <option value="">제목</option>
        <option value="">내용</option>
      </select>

      <input type="search" className="search" placeholder="게시물 검색" />

      <button>
        <SearchIcon />
      </button>
    </div>
  )
}

export default Search
