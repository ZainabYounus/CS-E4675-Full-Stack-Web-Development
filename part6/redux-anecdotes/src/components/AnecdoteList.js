import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => {    
        if (state.filter === '' ) {
            return state.anecdotes
        }
        else{
            return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        }   
    })
    const anecdotesArray = [...anecdotes]
    const dispatch = useDispatch()
  
    const voteAnecdote = (anecdote) => {
      dispatch(incrementVote(anecdote))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 6))
    }
  
    const cmpVotes = (a, b) => {
      return b.votes - a.votes
    }

    return (
        <div>
        <h2>Anecdotes</h2>
        {anecdotesArray.sort(cmpVotes) && anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => voteAnecdote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList

// import { initializeAnecdotes, saveVote } from '../reducers/anecdoteReducer'
// import { useSelector } from 'react-redux'
// import { notification } from '../reducers/notificationReducer'
// import { useEffect } from 'react'

// export default function AnecdoteList({ dispatch }) {

//   useEffect(() => {
//     dispatch(initializeAnecdotes())
//   }, [dispatch])

//   const vote = async (id, content) => {
//     dispatch(saveVote(id))
//     dispatch(notification(`you voted '${content}'`, 5000))
//   }

//   const anecdotes = useSelector(state => {
//     return state.filter === 'ALL' ? [...state.anecdotes].sort((a, b) => b.votes - a.votes) : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase()
//     .includes(state.filter.toLowerCase()))
//     .sort((a, b) => b.votes - a.votes)
//   })

//   return (
//     <div>
//     {anecdotes.map(anecdote =>
//       <div key={anecdote.id}>
//         <div>
//           {anecdote.content}
//         </div>
//         <div>
//           has {anecdote.votes}
//           <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
//         </div>
//       </div>
//     )}
//     </div>
//   )
// }

