import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        hideNotification(state, action) {
            return null  
        }
    }
})

export const setNotification = (message, time) => {
    return async (dispatch) => {
      dispatch(showNotification(message))
      setTimeout(() => {
        dispatch(hideNotification())
      }, time * 1000)
    }
}

export const { showNotification, hideNotification } = notificationSlice.actions

export default notificationSlice.reducer  

// import { createSlice } from "@reduxjs/toolkit"

// const notificationSlice = createSlice({
//   name: 'notification',
//   initialState: '',
//   reducers: {
//     setNotification(state, action) {
//       console.log(action.payload)
//       action.type = 'SET_NOTIFICATION'
//       return action.payload
//     },
//     removeNotification(state, action) {
//       return ''
//     }
//   }
// })

// export const { setNotification, removeNotification } = notificationSlice.actions

// export const notification = (message, duration) => {
//   return async dispatch => {
//     dispatch(setNotification(message))
//     setTimeout(() => {
//       dispatch(removeNotification())
//     }, duration)
//   }
// }

// export default notificationSlice.reducer