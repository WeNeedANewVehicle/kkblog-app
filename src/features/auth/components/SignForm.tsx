import { FormEventHandler, PropsWithChildren } from 'react'

interface SignFormProps extends PropsWithChildren {
  title: string
  onSubmit?: FormEventHandler<HTMLFormElement>
}

function SignForm({ children, title, onSubmit }: SignFormProps) {
  return (
    <section className={'container flex h-screen'}>
      <div className={'flex flex-1 justify-center items-center '}>
        <div
          className={
            'flex flex-col p-10 max-w-sm bg-dark-500 rounded-md shadow-light'
          }
        >
          <h1 className={'text-8xl pb-8 '}>{title}</h1>
          <form
            className={'flex flex-col gap-4 text-xl'}
            method="POST"
            onSubmit={onSubmit}
          >
            {children}
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignForm
