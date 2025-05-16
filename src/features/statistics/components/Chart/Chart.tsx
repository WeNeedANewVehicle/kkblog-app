'use client'

import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
interface ChartProps {}

function CountChart() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = ref.current

    if (!ctx) {
      return
    }

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['새 포스팅', '전체 포스팅', '오늘 방문자', '전체 방문자'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })

    return () => {
      chart.destroy()
    }
  }, [])

  return (
    <div>
      <canvas id="chart" ref={ref}></canvas>
    </div>
  )
}

export default CountChart
