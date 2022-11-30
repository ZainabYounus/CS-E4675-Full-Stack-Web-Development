import { useState } from 'react'

const Heading = ({text}) => <h1>{text}</h1>
const Button = (props) => <button onClick = {props.onClick}>{props.text}</button>
const Content = ({text, counter}) => <p>{text} {counter}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <Heading text = 'give feedback'/>

      <Button text = 'good' onClick = {handleGoodFeedback}/>
      <Button text = 'neutral' onClick = {handleNeutralFeedback}/>
      <Button text = 'bad' onClick = {handleBadFeedback}/>

      <Heading text = 'statistics'/>

      <Content text = 'good' counter = {good}/>
      <Content text = 'neutral' counter = {neutral}/>
      <Content text = 'bad' counter = {bad}/>

    </div>
  )
}

export default App
