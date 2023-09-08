import auth from './slices/auth'
import user from './slices/user'
import project from './slices/project'
import settings from './slices/settings'
import dashboard from './slices/dashboard'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  auth,
  user,
  settings,
  project,
  dashboard,
})

export default rootReducer
