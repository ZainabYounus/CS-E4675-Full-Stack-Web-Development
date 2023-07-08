import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      console.log(action.payload)
      action.type = 'SET_NOTIFICATION'
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const notification = (message, duration) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, duration)
  }
}

export default notificationSlice.reducer