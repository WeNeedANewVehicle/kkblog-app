import Article from '@/components/Article/Article'
import ProjectItem from '@/features/projects/components/ProjectItem/ProjectItem'
import React from 'react'

function PortfolioPage() {
  return (
    <section className="flex flex-col gap-4">
        <title>
            포트폴리오 | 크크브
        </title>

        <Article title='수행 프로젝트'>
            {['모빌로', '유프관, 메디관', '타임너츠', '투딩'].map(project => <ProjectItem key={project} name={project}/>)}
        </Article>
    </section>
   
  )
}

export default PortfolioPage