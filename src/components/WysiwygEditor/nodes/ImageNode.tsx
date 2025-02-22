import React, { HTMLAttributes } from 'react'

interface ImageNodeProps extends HTMLAttributes<HTMLImageElement> {
  alt: string
}

// function ImageNode(props: ImageNodeProps) {
//   // eslint-disable-next-line @next/next/no-img-element
//   return <img {...props} alt={props.alt} />
// }

import { EditorConfig, ElementNode, LexicalNode } from 'lexical'

export class ImageNode extends ElementNode {
  src: string

  static getType(): string {
    return 'image'
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__key)
  }

  constructor(src: string) {
    super()
    this.src = src
  }

  createDOM(): HTMLElement {
    // Define the DOM element here
    const img = document.createElement('img')
    img.src = this.src
    img.style.width = '100%'
    return img
  }

  updateDOM(prevNode: this, dom: HTMLElement, config: EditorConfig): boolean {
    // Returning false tells Lexical that this node does not need its
    // DOM element replacing with a new copy from createDOM.
    return false
  }
}

export function $createImageNode(src: string) {
  return new ImageNode(src)
}
