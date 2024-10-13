import React from 'react'

function Hamburger() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon"
    >
      <line x1="4" y1="8.5" x2="28" y2="8.5" stroke="black" strokeWidth="5" />
      <line
        y1="-2.5"
        x2="24"
        y2="-2.5"
        transform="matrix(-1 0 0 1 28 26)"
        stroke="black"
        strokeWidth="5"
      />
    </svg>
  )
}

export default Hamburger
