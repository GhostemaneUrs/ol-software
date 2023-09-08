import React, { useEffect } from 'react'
import { Card } from '../../components/card'
import { PieGraph } from '../../components/pie'
import { BarGraph } from '../../components/bar'
import { LineGraph } from '../../components/line'
import { TwoBarGraph } from '../../components/twoBar'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCpuReport,
  getReportUser,
  getCommitsReport,
  getDashboardCards,
  getProjectAdvances,
} from '../../redux/slices/dashboard'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const { cardsDashboard } = useSelector(state => state.dashboard)

  useEffect(() => {
    dispatch(getCpuReport())
    dispatch(getReportUser())
    dispatch(getCommitsReport())
    dispatch(getDashboardCards())
    dispatch(getProjectAdvances())
  }, [])

  const cards = [
    {
      name: 'Tasks pending',
      icon: 'task',
      color: 'bg-custom-yellow-90',
      value: cardsDashboard.pedingNc,
    },
    {
      name: 'Projects completed',
      icon: 'developer_board',
      color: 'bg-custom-green-90',
      value: cardsDashboard.projects,
    },
    {
      name: 'Projects developed',
      icon: 'integration_instructions',
      color: 'bg-custom-blue-90',
      value: cardsDashboard.projectsDev,
    },
    {
      name: 'Recorded incidents',
      icon: 'gpp_bad',
      color: 'bg-custom-red-90',
      value: cardsDashboard.errorsDeploy,
    },
  ]

  return (
    <div className='px-4 mb-4 max-w-[1456px] m-auto'>
      <div className='flex justify-center gap-10 w-full mb-4'>
        {cards.map((item, index) => {
          return <Card key={index} item={item} />
        })}
      </div>
      <div className='flex gap-10 justify-center mb-4'>
        <TwoBarGraph />
        <LineGraph />
      </div>
      <div className='flex gap-10 justify-center'>
        <BarGraph />
        <PieGraph />
      </div>
    </div>
  )
}
