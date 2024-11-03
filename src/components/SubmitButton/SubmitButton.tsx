import React, { HTMLAttributes } from 'react'
import Loading from '../Loading/Loading'

interface SubmitButton extends HTMLAttributes<HTMLButtonElement> {
  isPending?: boolean
  text?: string
}

function SubmitButton({
  isPending,
  text = '전송',
  ...restProps
}: SubmitButton) {
  return (
    <button
      type="submit"
      className="submit text-center"
      disabled={isPending}
      {...restProps}
    >
      {isPending ? (
        <div className="flex items-center justify-center">
          <Loading bgStroke="#000000" spinnerStroke="#d6d6d6" />
        </div>
      ) : (
        text
      )}
    </button>
  )
}

export default SubmitButton
