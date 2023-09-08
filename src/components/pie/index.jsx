import React, { useMemo } from 'react'
import { Pie } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS?.register(ArcElement, Tooltip, Legend)

export const PieGraph = () => {
  const { reportUser } = useSelector(state => state.dashboard)
  const areas =
    reportUser
      ?.map(item => item.area)
      ?.filter((area, index, self) => self.indexOf(area) === index) || []

  const chartData = useMemo(() => {
    return {
      labels: areas,
      datasets: [
        {
          label: 'Areas',
          data: areas.map(
            area => reportUser?.filter(user => user.area === area).length || 0
          ),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
  }, [reportUser])

  return (
    <div className='bg-white border solid border-custom-gray-60 flex justify-center max-h-[350px] shadow-sm p-4 rounded-lg w-full'>
      <Pie
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
              text: 'USERS BY AREA',
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

export default PieGraph
