import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter dispatch={dispatch} />
      <AnecdoteList dispatch={dispatch} />
      <AnecdoteForm dispatch={dispatch} />
    </div>
  )
}

export default App