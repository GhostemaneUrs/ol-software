import Swal from 'sweetalert2'
import { API_URL } from '../../config/environments'
import { keysToCamel } from '../../utils/keyToCamel'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  project: {
    client: '',
    ci: false,
    cd: false,
    repoUrl: '',
    developers: '',
    databases: '',
    projectName: '',
    backendTecnology: '',
    frontendTecnology: '',
  },
  projects: [],
  loading: false,
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (state, action) => {
      state.project = action.payload
    },
    setProjects: (state, action) => {
      state.projects = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setProject, setProjects, setLoading } = projectSlice.actions

export const addProject = createAsyncThunk(
  'project/addProject',
  async (values, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/projects`, {
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
        title: 'Project successfully created',
        text: 'You can now see the project in the list',
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
      console.log('🚀 ~ file: project.js:241 ~ error:', error)
    }
  }
)

export const getProjects = createAsyncThunk(
  'project/getProjects',
  async (values, thunkApi) => {
    try {
      const { skip, limit } = values
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/projects`, {
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
      const startIndex = ((skip ?? 1) - 1) * limit ?? 10
      const endIndex = startIndex + (limit ?? 10) - 1
      const obj = {
        skip: skip ?? 1,
        limit: limit ?? 10,
        totalRows: data.length,
        totalPages: Math.ceil(data.length / limit ?? 10),
        data: keysToCamel(data.slice(startIndex, endIndex)),
      }

      thunkApi.dispatch(setProjects(obj))
      thunkApi.dispatch(setLoading(false))
    } catch (error) {
      console.log('🚀 ~ file: project.js:241 ~ error:', error)
    }
  }
)

export const removeProject = createAsyncThunk(
  'project/removeProject',
  async (values, thunkApi) => {
    try {
      const { id, filters } = values
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        thunkApi.dispatch(setLoading(false))
        throw new Error('Something went wrong')
      }

      thunkApi.dispatch(getProjects(filters))
      thunkApi.dispatch(setLoading(false))
    } catch (error) {
      console.log('🚀 ~ file: project.js:241 ~ error:', error)
    }
  }
)

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async (values, thunkApi) => {
    try {
      const { id } = values
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/projects/${id}`, {
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
        title: 'Project successfully updated',
        text: 'You can now see the project in the list',
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
      console.log('🚀 ~ file: project.js:163 ~ error:', error)
    }
  }
)

export const getProjectById = createAsyncThunk(
  'project/getProjectById',
  async (values, thunkApi) => {
    try {
      const { id } = values
      thunkApi.dispatch(setLoading(true))
      const response = await fetch(`${API_URL}/projects/${id}`, {
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
      thunkApi.dispatch(setProject(keysToCamel(data)))
    } catch (error) {
      console.log('🚀 ~ file: project.js:96 ~ error:', error)
      throw error
    }
  }
)

export default projectSlice.reducer
