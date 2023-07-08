import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const changedAnecdote = action.payload
      return state.map((anecdote) =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      )
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    }, 
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const incrementVote = (anecdote) => {
  return async (dispatch) => {
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.updateVote(anecdote.id, changedAnecdote)
    dispatch(vote(changedAnecdote))
  }
}

export const { vote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

// import { createSlice } from '@reduxjs/toolkit'
// import { getAll, createNew, incrementVote } from '../services/anecdotes'

// const anecdoteSlice = createSlice({
//   name: 'anecdote',
//   initialState: [],
//   reducers: {
//     giveVote(state, action) {
//       const id = action.payload
//       action.type = 'VOTE'
//       const anecdoteToChange = state.find(anecdote => anecdote.id === id)
//       const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
//       return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
//     },
//     createAnecdote(state, action) {
//       action.type = 'NEW'
//       console.log(action.payload)
//       return [...state, action.payload]
//     },
//     setAnecdotes(state, action) {
//       return action.payload
//     }
//   }
// })

// export const { giveVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

// export const initializeAnecdotes = () => {
//   return async dispatch => {
//     const anecdotes = await getAll()
//     dispatch(setAnecdotes(anecdotes))
//   }
// }

// export const addAnecdote = content => {
//   return async dispatch => {
//     const newAnecdote = await createNew(content)
//     dispatch(createAnecdote(newAnecdote))
//   }
// }

// export const saveVote = id => {
//   return async dispatch => {
//     await incrementVote(id)
//     dispatch(giveVote(id))
//   }
// }

// export default anecdoteSlice.reducer

