import React, { useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const LineGraph = () => {
  const { commitsReport } = useSelector(state => state.dashboard)

  const chartData = useMemo(() => {
    return {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Total commits features',
          data: commitsReport?.map(item => item.feat) || [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Total commits fixes',
          data: commitsReport?.map(item => item.fix) || [],
          borderColor: 'rgba(53, 162, 235, 0.5)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }
  }, [commitsReport])

  return (
    <div className='bg-white border solid border-custom-gray-60 shadow-sm p-4 rounded-lg w-full max-h-[350px]'>
      <Line
        data={chartData || []}
        options={{
          responsive: true,
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
            },
          },
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
              color: '#94969A',
              font: {
                size: 20,
                style: 'normal',
                weight: 'normal',
                family: 'Plus Jakarta Sans',
              },
              text: 'REPORT OF COMMITS PER MONTH',
            },
          },
        }}
      />
    </div>
  )
}
