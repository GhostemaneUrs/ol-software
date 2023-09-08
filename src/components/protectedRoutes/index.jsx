import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({ redirectTo = '/' }) => {
  const { auth } = useSelector(state => state.auth)

  if (!auth?.id) {
    return <Navigate to={redirectTo} />
  }

  return <Outlet />
}

export const ProtectedRouteAuth = ({ redirectTo = '/dashboard' }) => {
  const { auth } = useSelector(state => state.auth)

  if (auth?.id) {
    return <Navigate to={redirectTo} />
  }

  return <Outlet />
}
