import { Header } from '../header'
import { Loading } from '../loading'
import { Sidebar } from '../sidebar'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'

export const Layout = () => {
  const location = useLocation()
  const urlCurrent = location.pathname
  const { loading } = useSelector(state => state.user)

  return (
    <Fragment>
      <Loading state={loading} />
      <div className='flex h-full min-h-screen w-full'>
        {urlCurrent !== '/' && <Sidebar />}
        <div className='w-full flex-grow'>
          {urlCurrent !== '/' && <Header />}
          <main
            className={`${
              urlCurrent !== '/'
                ? 'h-[calc(100vh-90px)] isScroll px-4'
                : 'h-full'
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </Fragment>
  )
}
