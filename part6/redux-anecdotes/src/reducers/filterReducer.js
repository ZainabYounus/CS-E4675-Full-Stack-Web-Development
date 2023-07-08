const initialState = ''

const filterReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter
  }
}

export default filterReducer

// import { createSlice } from "@reduxjs/toolkit"

// const filterSlice = createSlice({
//   name: 'filter',
//   initialState: 'ALL',
//   reducers: {
//     filterChange(state, action) {
//       action.type = 'FILTER'
//       return action.payload
//     },
//     filterRemove(state, action) {
//       action.type = 'ALL'
//       return state
//     }
//   }
// })

// export const { filterChange, filterRemove } = filterSlice.actions
// export default filterSlice.reducer
