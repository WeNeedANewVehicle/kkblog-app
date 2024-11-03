import React, { useMemo } from 'react'
import Svg from '@/components/Icons/Svg'

interface LoadingProps {
  size?: number
  r?: number
  center?: number
  sw?: number
  bgStroke: string
  spinnerStroke: string
}

function Loading({
  r = 25,
  sw = 6,
  size = 50,
  bgStroke,
  spinnerStroke,
}: LoadingProps) {
  const radius = useMemo(() => r - sw, [r, sw])

  // center position
  const cp = useMemo(() => size / 2, [size])

  const strokeDashArray = useMemo(() => {
    const circumference = 2 * Math.PI * (r - sw)
    return Math.ceil(circumference)
  }, [r, sw])

  return (
    <Svg width={size} height={size}>
      <circle
        r={radius}
        cx={cp}
        cy={cp}
        strokeWidth={sw}
        fill="none"
        stroke={bgStroke}
      />
      <circle
        className="spinner-animation"
        r={radius}
        cx={cp}
        cy={cp}
        fill="none"
        strokeWidth={sw}
        stroke={spinnerStroke}
        strokeDasharray={strokeDashArray}
        strokeDashoffset={strokeDashArray - strokeDashArray / 4}
      />
    </Svg>
  )
}

export default Loading
