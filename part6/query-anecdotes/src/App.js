import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, voteAnecdote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext, { useNotificationDispatch } from './NotificationContext'


const App = () => {

  const queryClient = useQueryClient()

  const voteMutation = useMutation(voteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const notificationDispatch = useNotificationDispatch(NotificationContext)

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }, {
      onSuccess: () => {
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: `anecdote '${anecdote.content}' voted` })
        setTimeout(() => {
          notificationDispatch({ type: 'CLEAR_NOTFICATION' })
        }, 5000)
      },
      onError: () => {
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: `something went wrong, please try again` })
        setTimeout(() => {
          notificationDispatch({ type: 'CLEAR_NOTFICATION' })
        }, 5000)
      }
    })
  }

  const anecdotes = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry: 1
    }
  )

  if (anecdotes.isLoading) {
    return <div>Loading...</div>
  }

  if (!anecdotes.isSuccess) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm queryClient={queryClient} />
    
      {anecdotes.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

// import AnecdoteForm from './components/AnecdoteForm'
// import Notification from './components/Notification'
// import { useQuery, useMutation, useQueryClient } from 'react-query'
// import axios from 'axios'
// import { getAnecdotes, createAnecdote } from './components/AnecdoteForm'

// const App = () => {

//   const createAnecdote = newAnecdote =>  
//     axios.post('http://localhost:3001/anecdotes', newAnecdote).then(res => res.data)

//   const queryClient = useQueryClient()
//   const newAnecdoteMutation = useMutation(createAnecdote, {
//     onSuccess: (newAnecdote) => {
//       const anecdote = queryClient.getQueryData('anecdote')      
//       queryClient.setQueryData('anecdote', anecdote.concat(newAnecdote))  
//     },
//   })

//   const new1AnecdoteMutation = useMutation(handleVote, {
//     onSuccess: (newAnecdote) => {
//       const anecdote = queryClient.getQueryData('anecdote')      
//       queryClient.setQueryData('anecdote', anecdote.concat(newAnecdote))  
//     },
//   })
 
//   const result = useQuery(    
//     'anecdotes',    
//     () => axios.get('http://localhost:3001/anecdotes')
//     .then(res => res.data)
//     .catch(er => false))  
//   console.log(result)
//   if ( result.isLoading ) {
//     return <div>loading data...</div> 
//   }
//   const anecdotes = result.data

//   const handleVote = (anecdote) => {
//     anecdote.votes = anecdote.votes + 1
//   }

//   // const anecdotes = [
//   //   {
//   //     "content": "If it hurts, do it more often",
//   //     "id": "47145",
//   //     "votes": 0
//   //   },
//   // ]

//   if(!anecdotes){
//     return (
//       <div>
//         <h3>Anecdote service not available due to problems in the server</h3>
//       </div>
//     )
//   }
//   return (
//     <div>
//       <h3>Anecdote app</h3>
//       <Notification />
//       <AnecdoteForm />
    
//       {anecdotes.map(anecdote =>
//         <div key={anecdote.id}>
//           <div>
//             {anecdote.content}
//           </div>
//           <div>
//             has {anecdote.votes}
//             <button onClick={() => handleVote(anecdote)}>vote</button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default App
