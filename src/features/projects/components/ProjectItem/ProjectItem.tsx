import Image from 'next/image'
import React from 'react'

interface ProjectItemProps {
  name: string
  src?: string
}

function ProjectItem({ name, src }: ProjectItemProps) {
  return (
    <li>
      <h2>{name}</h2>
      <span className="relative aspect-video">
        {src && <Image src={src!} alt={name} fill />}
      </span>
    </li>
  )
}

export default ProjectItem
