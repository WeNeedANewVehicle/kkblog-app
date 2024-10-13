import React, { SVGAttributes } from 'react'

type SvgProps = SVGAttributes<SVGSVGElement>

function Svg(props: SvgProps) {
  const { children, ...restProps } = props
  return <svg {...restProps}>{children}</svg>
}

export default Svg
