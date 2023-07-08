import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
  return (
    <div>    
      <h2>Anecdotes</h2>
      <Notification />
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}
export default App

// import { useDispatch } from 'react-redux'
// import AnecdoteForm from './components/AnecdoteForm'
// import AnecdoteList from './components/AnecdoteList'
// import Filter from './components/Filter'
// import Notification from './components/Notification'

// const App = () => {
  
//   const dispatch = useDispatch()

//   return (
//     <div>
//       <h2>Anecdotes</h2>
//       <Notification />
//       <Filter dispatch={dispatch} />
//       <AnecdoteList dispatch={dispatch} />
//       <AnecdoteForm dispatch={dispatch} />
//     </div>
//   )
// }

// export default App