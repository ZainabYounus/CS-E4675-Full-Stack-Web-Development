import { useState } from 'react'

const Content = (props) => {
  return(
    <div>
      <h1>{props.heading}</h1>
      <p>{props.anecdote}</p>
      <p>has {props.voteCount} votes</p>
    </div>
  )
}

const Button = ({text, onClick}) => <button onClick = {onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const loadNextAnecdote = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handlePoints = () => {
    const copy = [...points]
    copy[selected] += 1 
    setPoints(copy)
  }

  let maximumVotes = Math.max(...points)
  let index = points.indexOf(maximumVotes)
  
  return (
    <div>

      <Content heading = 'Anecdote of the day' anecdote = {anecdotes[selected]} voteCount = {points[selected]}/>

      <Button text = 'vote' onClick = {handlePoints} />
      <Button text = 'Next anecdote' onClick = {loadNextAnecdote} />

      <Content heading = 'Anecdote with most votes' anecdote = {anecdotes[index]} voteCount = {maximumVotes}/>
      
    </div>
  )
}

export default App