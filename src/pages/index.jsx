import React from 'react'
import { SignIn } from './signIn'
import { Layout } from '../components/layout'
import { Routes, Route } from 'react-router-dom'

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<SignIn />} />
      </Route>
    </Routes>
  )
}
