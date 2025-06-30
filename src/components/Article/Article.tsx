import React, { HTMLAttributes, PropsWithChildren } from 'react'

interface ArticleProps extends PropsWithChildren {
  className?: string
  title: string
}

function Article({ children, className, title }: ArticleProps) {
  return (
    <article
      className={`flex flex-col gap-4 py-8 border-b-2 ${className && ''}`}
    >
      <h2 className="text-2xl">{title}</h2>
      {children}
    </article>
  )
}

export default Article
