'use client'

import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const scrollEvent = () => {
      const element = ref.current;
      // 예전에는 document.body.scrollTop 이 썼지만 표준 document.documentElement

      // 현재 스크롤된 거리 (위에서부터 얼마나 스크롤했는지)
      const scrollTop = document.documentElement.scrollTop;
      
      // 완전히 펼쳐진 페이지의 전체 문서 높이
      const scrollHeight = document.documentElement.scrollHeight;

      // 보이는 영역의 높이 (스크롤바를 포함한 브라우저 창 높이)
      const clientHeight = document.documentElement.clientHeight;

      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (element) {
        element.style.transform = `scaleX(${scrollPercentage}%)`
      }
      

    }
    window.addEventListener('scroll', scrollEvent)

    return () => {
      window.removeEventListener('scroll', scrollEvent)
    }
  }, []);
  return (
    createPortal(
      <div className='fixed z-10001 top-[64px] w-screen max-w-7xl h-1 bg-gray-600'>
        <div className="w-full bg-blink h-1 transform-[scaleX(0%)] transition-transform origin-left" ref={ref}/>
      </div>,
      document.body
    )
  );
}

export default ProgressBar