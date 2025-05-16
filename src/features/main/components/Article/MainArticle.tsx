import React, { HTMLAttributes, PropsWithChildren } from 'react'

interface MainArticleProps extends PropsWithChildren {
  className?: string
  title: string
}

function MainArticle({ children, className, title }: MainArticleProps) {
  return (
    <article className={`flex flex-col gap-4 py-8 border-b-2 ${className && ''}`}>
      <h2 className="text-2xl">{title}</h2>
      {children}
    </article>
  )
}

export default MainArticle
