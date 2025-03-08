import React from 'react'
import styles from '@/components/ErrorMessage/ErrorMessage.module.css'

interface ErrorMessageProps {
  message?: string
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className={styles.wrapper}>{message}</div>
}

export default ErrorMessage
