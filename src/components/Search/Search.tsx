import React from 'react'
import SearchIcon from '@/../public/icons/search.svg'
import Button from '@/components/Button/Button'
import styles from '@/components/Search/Search.module.css'
import Input from '@/components/Input/Input'

function Search() {
  return (
    <div className={`flex items-center justify-center`}>
      <form className={`flex items-center gap-half`}>
        <div className={`flex items-center ${styles.search}`}>
          <Input type="search" className={styles.input} placeholder="검색" />

          <Button className={styles.btn}>
            <SearchIcon className={styles.icon} />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Search
