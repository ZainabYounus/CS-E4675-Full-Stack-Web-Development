import { useMutation } from 'react-query'
import { createAnecdote } from '../requests'

import NotificationContext, { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = ({ queryClient }) => {

  const notificationDispatch = useNotificationDispatch(NotificationContext)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 }, {
      onError: () => {
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: `failed to create anecdote (anecdote must be at least 5 characters long)` })
        setTimeout(() => {
          notificationDispatch({ type: 'CLEAR_NOTFICATION' })
        }, 5000)
      },
      onSuccess: () => {
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: `anecdote '${content}' created` })
        setTimeout(() => {
          notificationDispatch({ type: 'CLEAR_NOTFICATION' })
        }, 5000)
      }
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

// import axios from 'axios'

// const baseUrl = 'http://localhost:3001/anecdotes'

// const AnecdoteForm = () => {

//   const createAnecdote = newAnecdote =>  
//     axios.post(baseUrl, newAnecdote).then(res => res.data)

//   const onCreate = (event) => {
//     event.preventDefault()
//     const content = event.target.anecdote.value
//     createAnecdote(content)
//     event.target.anecdote.value = ''
//     console.log('new anecdote')
//     newAnecdoteMutation.mutate({ content, important: true })
// }

//   return (
//     <div>
//       <h3>create new</h3>
//       <form onSubmit={onCreate}>
//         <input name='anecdote' />
//         <button type="submit">create</button>
//       </form>
//     </div>
//   )
// }

// export default AnecdoteForm
