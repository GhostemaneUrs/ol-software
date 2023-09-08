import React, { useEffect } from 'react'
import { Users } from './user'
import { SignIn } from './signIn'
import toast from 'react-hot-toast'
import { Projects } from './project'
import { Dashboard } from './dashboard'
import { Layout } from '../components/layout'
import { Routes, Route } from 'react-router-dom'
import {
  ProtectedRoute,
  ProtectedRouteAuth,
} from '../components/protectedRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications, setViewNotification } from '../redux/slices/user'

export const AppRouter = () => {
  const dispatch = useDispatch()
  const { viewNotification, notifications } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getNotifications())
  }, [])

  useEffect(() => {
    if (viewNotification) {
      notifications?.map(item => {
        return toast.custom(t => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className='flex-1 w-0 p-4'>
              <div className='flex items-start'>
                <div className='flex-shrink-0 pt-0.5'>
                  <img
                    className='h-10 w-10 rounded-full'
                    src='https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80'
                    alt=''
                  />
                </div>
                <div className='ml-3 flex-1'>
                  <p className='text-sm font-medium text-gray-900'>
                    Andres Jaramillo
                  </p>
                  <p className='mt-1 text-sm text-gray-500'>{item.details}</p>
                </div>
              </div>
            </div>
            <div className='flex border-l border-gray-200'>
              <button
                onClick={() => toast.dismiss(t.id)}
                className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              >
                Close
              </button>
            </div>
          </div>
        ))
      })
    }

    setTimeout(() => {
      dispatch(setViewNotification(false))
    }, 1000)
  }, [viewNotification])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProtectedRouteAuth />}>
          <Route path='/' element={<SignIn />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/users' element={<Users />} />
        </Route>
      </Route>
      <Route path='*' element={<h1>404</h1>} />
    </Routes>
  )
}
