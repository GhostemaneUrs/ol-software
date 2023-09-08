import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openModal: false,
  openDrawer: false,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setOpenDrawer: (state, action) => {
      state.openDrawer = action.payload
    },
    setOpenModal: (state, action) => {
      state.openModal = action.payload
    },
  },
})

export const { setStepper, setOpenModal, setOpenDrawer } = settingsSlice.actions

export const toggleDrawer = state => {
  return dispatch => {
    dispatch(setOpenDrawer(!state))
  }
}

export const toggleModal = state => {
  return dispatch => {
    dispatch(setOpenModal(!state))
  }
}

export default settingsSlice.reducer
