import { createSlice } from '@reduxjs/toolkit'
import { getAll, createNew, incrementVote } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    giveVote(state, action) {
      const id = action.payload
      action.type = 'VOTE'
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
    },
    createAnecdote(state, action) {
      action.type = 'NEW'
      console.log(action.payload)
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { giveVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const saveVote = id => {
  return async dispatch => {
    await incrementVote(id)
    dispatch(giveVote(id))
  }
}

export default anecdoteSlice.reducer


// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch (action.type) {
//     case 'VOTE':
//       const id = action.payload.id
//       const anecdoteToChange = state.find(anecdote => anecdote.id === id)
//       const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
//       return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
//     case 'NEW':
//       return [...state, asObject(action.payload['content'])]
//     default:
//       return state
//   }
// }

// export const giveVote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW',
//     payload: {
//       content
//     }
//   }
// }

// export default anecdoteReducer

