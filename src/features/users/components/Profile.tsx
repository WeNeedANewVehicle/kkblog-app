import Image from 'next/image'
import React from 'react'

function Profile() {
  return (
    <article className="flex flex-col items-center">
      <Image
        className="border-4 border-red-500 rounded-[100%] aspect-square object-contain"
        src="/images/404.png"
        width={250}
        height={250}
        alt="오레오"
      />
      <h2>김강범</h2>
      <p className="text-2xl">
        안녕하세요. <br />
        기술의 철학과 지향점을 이해하고 공감하는데 관심이 많은
        <br /> 타입스크립트 개발자입니다.
      </p>
    </article>
  )
}

export default Profile
