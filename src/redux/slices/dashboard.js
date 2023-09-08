import { keysToCamel } from '../../utils/keyToCamel'
import { API_URL } from '../../config/environments'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  cpuReport: {},
  reportUser: [],
  commitsReport: [],
  cardsDashboard: {},
  projectAdvances: [],
  viewNotification: false,
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setCpuReport: (state, action) => {
      state.cpuReport = action.payload
    },
    setReportUser: (state, action) => {
      state.reportUser = action.payload
    },
    setCommitsReport: (state, action) => {
      state.commitsReport = action.payload
    },
    setCardsDashboard: (state, action) => {
      state.cardsDashboard = action.payload
    },
    setProjectAdvances: (state, action) => {
      state.projectAdvances = action.payload
    },
    setViewNotification: (state, action) => {
      state.viewNotification = action.payload
    },
  },
})

export const {
  setLoading,
  setCpuReport,
  setReportUser,
  setCommitsReport,
  setCardsDashboard,
  setProjectAdvances,
  setViewNotification,
} = dashboardSlice.actions

export const getCpuReport = createAsyncThunk(
  'user/getCpuReport',
  async (values, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/cpu_report`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        thunkApi.dispatch(setLoading(false))
        throw new Error('Something went wrong')
      }

      const data = await response.json()

      thunkApi.dispatch(setLoading(false))
      thunkApi.dispatch(setCpuReport(keysToCamel(data)))
    } catch (error) {
      thunkApi.dispatch(setLoading(false))
      console.log('🚀 ~ file: user.js:67 ~ error:', error)
      throw error
    }
  }
)

export const getReportUser = createAsyncThunk(
  'user/getReportUser',
  async (values, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        thunkApi.dispatch(setLoading(false))
        throw new Error('Something went wrong')
      }

      const data = await response.json()

      thunkApi.dispatch(setLoading(false))
      thunkApi.dispatch(setReportUser(keysToCamel(data)))
    } catch (error) {
      thunkApi.dispatch(setLoading(false))
      console.log('🚀 ~ file: user.js:67 ~ error:', error)
      throw error
    }
  }
)

export const getCommitsReport = createAsyncThunk(
  'user/getCommitsReport',
  async (values, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/report_commits`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        thunkApi.dispatch(setLoading(false))
        throw new Error('Something went wrong')
      }

      const data = await response.json()

      thunkApi.dispatch(setLoading(false))
      thunkApi.dispatch(setCommitsReport(keysToCamel(data)))
    } catch (error) {
      thunkApi.dispatch(setLoading(false))
      console.log('🚀 ~ file: user.js:67 ~ error:', error)
      throw error
    }
  }
)

export const getDashboardCards = createAsyncThunk(
  'user/getDashboardCards',
  async (values, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/dashboard_cards`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        thunkApi.dispatch(setLoading(false))
        throw new Error('Something went wrong')
      }

      const data = await response.json()

      thunkApi.dispatch(setLoading(false))
      thunkApi.dispatch(setCardsDashboard(keysToCamel(data)))
    } catch (error) {
      thunkApi.dispatch(setLoading(false))
      console.log('🚀 ~ file: user.js:98 ~ error:', error)
      throw error
    }
  }
)

export const getProjectAdvances = createAsyncThunk(
  'user/getProjectAdvances',
  async (values, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/release_resume`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        thunkApi.dispatch(setLoading(false))
        throw new Error('Something went wrong')
      }

      const data = await response.json()

      thunkApi.dispatch(setLoading(false))
      thunkApi.dispatch(setProjectAdvances(keysToCamel(data)))
    } catch (error) {
      thunkApi.dispatch(setLoading(false))
      console.log('🚀 ~ file: user.js:67 ~ error:', error)
      throw error
    }
  }
)

export default dashboardSlice.reducer
