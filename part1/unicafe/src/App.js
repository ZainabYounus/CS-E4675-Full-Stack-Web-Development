import { useState } from 'react'

const Heading = ({text}) => <h1>{text}</h1>

const Button = (props) => <button onClick = {props.onClick}>{props.text}</button>

const Statistics = (props) => {
  return(
    <p>{props.text} {props.value}</p>
  ) 
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const weightage = {
    good: 1,
    neutral : 0,
    bad : -1
  }
  
  let total = good + neutral + bad
  let average = (weightage.good*good + weightage.neutral*neutral + weightage.bad*bad) / total
  average = isNaN(average) ? 0 : average

  let positivePercentage = (good/total)*100 
  positivePercentage = isNaN(positivePercentage) ? 0 : positivePercentage
  positivePercentage = positivePercentage + '%'


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

      <Statistics text = 'good' value = {good}/>
      <Statistics text = 'neutral' value = {neutral}/>
      <Statistics text = 'bad' value = {bad}/>

      <Statistics text = 'all' value = {total}/>
      <Statistics text = 'average' value = {average}/>
      <Statistics text = 'positive' value = {positivePercentage}/>

    </div>
  )
}

export default App
