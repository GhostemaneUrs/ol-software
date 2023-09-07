import React from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className='flex min-h-screen w-full'>
      <main className='w-full flex-grow'>
        <Outlet />
      </main>
    </div>
  )
}
