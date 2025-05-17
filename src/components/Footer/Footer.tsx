import React from 'react'
import Logo from '@/../public/icons/logo.svg'
import MailIcon from '@/../public/icons/mail.svg'
import GitHubIcon from '@/../public/icons/github.svg'

function Footer() {
  return (
    <footer className="flex flex-col px-8 md:px-16  py-16 gap-16 items-center bg-gray-950 text-gray-200 m-auto">
      <div className="flex justify-between w-full  gap-4 flex-col">
        <Logo className="logo [&>path]:fill-gray-200" width={100} height={32} />

        <div className="flex gap-4 justify-end">
          <a
            className="flex gap-4"
            href="https://github.com/WeNeedANewVehicle"
            target="_blank"
            rel="no-referrer"
          >
            <GitHubIcon className="fill-white w-8 h-8" />
          </a>

          <a
            className="w-8 h-8 flex justify-center items-center gap-4 bg-white rounded-4xl"
            href="mailto:kkb931115@gmail.com"
          >
            <MailIcon className="icon stroke-gray-950 w-8 h-8" />
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-4 self-start ">
        <p>
          KKblog is Build with{' '}
          <a href="https://nextjs.org/" target="_blank" rel="no-referrer">
            Next.js
          </a>{' '}
          ·{' '}
          <a href={'https://nestjs.com/'} target="_blank" rel="no-referrer">
            Nest.js
          </a>
        </p>
        <p>© Copyright to KKblog. All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer
