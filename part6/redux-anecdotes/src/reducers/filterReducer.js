import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'ALL',
  reducers: {
    filterChange(state, action) {
      action.type = 'FILTER'
      return action.payload
    },
    filterRemove(state, action) {
      action.type = 'ALL'
      return state
    }
  }
})

export const { filterChange, filterRemove } = filterSlice.actions
export default filterSlice.reducer

// const filterReducer = (state='ALL', action) => {
//   switch (action.type) {
//     case 'FILTER':
//       return action.payload
//     case 'ALL':
//       return state
//     default:
//       return state
//   }
// }

// export const filterChange = (filter) => {
//   return {
//     type: 'FILTER',
//     payload: filter
//   }
// }

// export const filterRemove = () => {
//   return {
//     type: 'ALL',
//   }
// }

// export default filterReducer