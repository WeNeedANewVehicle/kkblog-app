import React from 'react'

function Title() {
  return (
    <label className="flex flex-col gap-4">
      제목
      <input
        className="w-full border border-dark-100 p-4"
        type="text"
        placeholder="여기에 제목을 입력하세요"
      />
    </label>
  )
}

export default Title
