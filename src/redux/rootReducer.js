import auth from './slices/auth'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  auth,
})

export default rootReducer
