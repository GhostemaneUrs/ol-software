import Swal from 'sweetalert2'
import { API_URL } from '../../config/environments'
import { keysToCamel } from '../../utils/keyToCamel'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  auth: {
    rol: '',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setAuth, setLoading } = authSlice.actions

export const logout = () => dispatch => {
  dispatch(setAuth(null))
}

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (values, thunkApi) => {
    try {
      const { user, password } = values
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/login`, {
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

      const foundUser = data.find(
        element => element.user === user && element.password === password
      )

      const obj = keysToCamel(foundUser)

      if (obj) {
        thunkApi.dispatch(setLoading(false))
        thunkApi.dispatch(getRolesUser(obj.id))
        const { id, userId, user } = obj
        thunkApi.dispatch(
          setAuth({
            ...thunkApi.getState().auth.auth,
            id,
            userId,
            user,
          })
        )
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid credentials!',
          showCloseButton: true,
          showConfirmButton: false,
          customClass: {
            title: 'error-title',
            htmlContainer: 'error-content',
            closeButton: 'error-close-button',
            confirmButton: 'error-question-button',
          },
        })
        thunkApi.dispatch(setLoading(false))
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      thunkApi.dispatch(setLoading(false))
      console.log('🚀 ~ file: auth.js:42 ~ error:', error)
      throw error
    }
  }
)

export const getRolesUser = createAsyncThunk(
  'auth/getRolesUser',
  async (values, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/rols/${values}`, {
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
      thunkApi.dispatch(
        setAuth({ ...thunkApi.getState().auth.auth, rol: data.name })
      )
    } catch (error) {
      console.log('🚀 ~ file: auth.js:48 ~ error:', error)
      throw error
    }
  }
)

export default authSlice.reducer
