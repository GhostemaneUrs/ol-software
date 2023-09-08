/* eslint-disable prefer-const */
import { keysToCamel } from '../../utils/keyToCamel'
import { API_URL } from '../../config/environments'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

const initialState = {
  user: {
    name: '',
    lastName: '',
    area: '',
    list: '',
    rol: '',
  },
  users: [],
  loading: false,
  notifications: [],
  viewNotification: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload
    },
    setViewNotification: (state, action) => {
      state.viewNotification = action.payload
    },
  },
})

export const {
  setUser,
  setUsers,
  setLoading,
  setNotifications,
  setViewNotification,
} = userSlice.actions

export const viewNotifications = () => (dispatch, getState) => {
  const notification = getState().user.viewNotification
  return dispatch(setViewNotification(!notification))
}

export const addUser = createAsyncThunk(
  'user/addUser',
  async (values, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        thunkApi.dispatch(setLoading(false))
        throw new Error('Something went wrong')
      }

      Swal.fire({
        icon: 'success',
        title: 'User successfully created',
        text: 'You can now see the user in the list',
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          title: 'error-title',
          htmlContainer: 'error-content',
          denyButton: 'error-deny-button',
          confirmButton: 'error-question-button',
        },
      })
      thunkApi.dispatch(setLoading(false))
    } catch (error) {
      console.log('🚀 ~ file: user.js:241 ~ error:', error)
    }
  }
)

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (values, thunkApi) => {
    try {
      const { skip, limit } = values

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
      const startIndex = ((skip ?? 1) - 1) * (limit ?? 10)
      const endIndex = startIndex + ((limit ?? 10) - 1)
      const obj = {
        skip: skip ?? 1,
        limit: limit ?? 10,
        totalRows: data.length,
        totalPages: Math.ceil(data.length / (limit ?? 10)),
        data: keysToCamel(data.slice(startIndex, endIndex)),
      }

      thunkApi.dispatch(setUsers(obj))
      thunkApi.dispatch(setLoading(false))
    } catch (error) {
      console.log('🚀 ~ file: user.js:241 ~ error:', error)
    }
  }
)

export const removeUser = createAsyncThunk(
  'user/removeUser',
  async (values, thunkApi) => {
    try {
      const { id, filters } = values
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        thunkApi.dispatch(setLoading(false))
        throw new Error('Something went wrong')
      }

      thunkApi.dispatch(getUsers(filters))
      thunkApi.dispatch(setLoading(false))
    } catch (error) {
      console.log('🚀 ~ file: user.js:241 ~ error:', error)
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (values, thunkApi) => {
    try {
      const { id } = values
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        thunkApi.dispatch(setLoading(false))
        throw new Error('Something went wrong')
      }
      Swal.fire({
        icon: 'success',
        title: 'User successfully updated',
        text: 'You can now see the user in the list',
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          title: 'error-title',
          htmlContainer: 'error-content',
          denyButton: 'error-deny-button',
          confirmButton: 'error-question-button',
        },
      })
      thunkApi.dispatch(setLoading(false))
    } catch (error) {
      console.log('🚀 ~ file: user.js:163 ~ error:', error)
    }
  }
)

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (values, thunkApi) => {
    try {
      const { id } = values
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/users/${id}`, {
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
      thunkApi.dispatch(setUser(keysToCamel(data)))
    } catch (error) {
      console.log('🚀 ~ file: user.js:96 ~ error:', error)
      throw error
    }
  }
)

export const getNotifications = createAsyncThunk(
  'user/getNotifications',
  async (values, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/notification`, {
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
      thunkApi.dispatch(setNotifications(keysToCamel(data)))
    } catch (error) {
      thunkApi.dispatch(setLoading(false))
      console.log('🚀 ~ file: user.js:67 ~ error:', error)
      throw error
    }
  }
)

export default userSlice.reducer
