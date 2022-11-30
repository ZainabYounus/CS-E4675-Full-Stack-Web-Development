import { useState } from 'react'

const Heading = ({text}) => <h1>{text}</h1>

const Button = (props) => <button onClick = {props.onClick}>{props.text}</button>

const StatisticLine = (props) => {
  return(
    <p>{props.text} {props.value}</p> 
  )
}

const Statistics = ({stats}) => {
  if(stats.total !== 0){
    return (
      <div>
        <StatisticLine text = 'good' value = {stats.good}/>
        <StatisticLine text = 'neutral' value = {stats.neutral}/>
        <StatisticLine text = 'bad' value = {stats.bad}/>

        <StatisticLine text = 'all' value = {stats.total}/>
        <StatisticLine text = 'average' value = {stats.average}/>
        <StatisticLine text = 'positive' value = {stats.positivePercentage}/>
      </div>
    )
  }
  else{
    return(
      <p>No feedback given</p>
    )
  }
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

  let stats = {
    good: good,
    neutral: neutral,
    bad: bad, 
    total: total,
    average: average,
    positivePercentage: positivePercentage
  }

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

      <Statistics stats = {stats}/>

    </div>
  )
}

export default App
