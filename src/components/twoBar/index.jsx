import React, { useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

ChartJS?.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const TwoBarGraph = () => {
  const { cpuReport } = useSelector(state => state.dashboard)

  const chartData = useMemo(() => {
    return {
      labels: cpuReport.time?.map(item => item.time) || [],
      datasets: [
        {
          label: 'Week',
          data: cpuReport.time?.map(item => item.value) || [],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Previous week',
          data: cpuReport.time?.map(item => item.value) || [],
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }
  }, [cpuReport])

  return (
    <div className='bg-white border solid border-custom-gray-60 shadow-sm p-4 rounded-lg w-full max-h-[350px]'>
      <Bar
        data={chartData || []}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: 'black',
                font: {
                  size: 14,
                  weight: 'bold',
                  family: 'Plus Jakarta Sans',
                },
              },
            },
            title: {
              display: true,
              text: 'SERVER DETAILS',
              color: '#94969A',
              font: {
                size: 20,
                style: 'normal',
                weight: 'normal',
                family: 'Plus Jakarta Sans',
              },
            },
          },
        }}
      />
    </div>
  )
}
