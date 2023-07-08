import { useDispatch } from "react-redux"
import { createAnecdote as create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(create(content))
        dispatch(setNotification(`you created a new anecdote '${content}'`, 6))
    }

    return (
        <div>
            <h2>create new: </h2>
            <form onSubmit={add}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm

// import { addAnecdote } from '../reducers/anecdoteReducer'
// import { notification } from '../reducers/notificationReducer'

// export default function AnecdoteForm({ dispatch }) {

//   const handleCreateAnecdote = async (event) => {
//     event.preventDefault()

//     const content = event.target.anecdote.value
//     event.target.anecdote.value = ''

//     dispatch(addAnecdote(content))

//     dispatch(notification(`anecdote '${content}' created`, 5000))
//   }

// return(
//   <div>
//     <h2>create new</h2>
//       <form onSubmit={handleCreateAnecdote}>
//         <div><input name='anecdote' /></div>
//         <button>create</button>
//       </form>
//   </div>
//   )
// }