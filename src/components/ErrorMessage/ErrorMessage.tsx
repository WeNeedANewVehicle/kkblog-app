import React from 'react'

interface ErrorMessageProps {
  message?: string
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className="text-[0.8rem] h-4 text-red-600">{message}</div>
}

export default ErrorMessage
