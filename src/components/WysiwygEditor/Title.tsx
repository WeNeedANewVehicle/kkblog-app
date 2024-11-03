import React from 'react'

function Title() {
  return (
    <label>
      제목
      <input
        className="post-title"
        type="text"
        placeholder="여기에 제목을 입력하세요"
      />
    </label>
  )
}

export default Title
