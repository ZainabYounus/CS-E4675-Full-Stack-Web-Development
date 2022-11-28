const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.partName} {props.exerciseNumber}
    </p>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part  partName = {props.parts[0].name} exerciseNumber = {props.parts[0].exercises}/>
      <Part  partName = {props.parts[1].name} exerciseNumber = {props.parts[1].exercises}/>
      <Part  partName = {props.parts[2].name} exerciseNumber = {props.parts[2].exercises}/>
    </div>
  )
}


const Total = (props) => {
  return(
    <p>Number of exercises {props.exercises}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const partsInfo = [
    {
      name : 'Fundamentals of React',
      exercises: 10
    },
    {
      name : 'Using props to pass data',
      exercises: 7
    },
    {
      name : 'State of a component',
      exercises: 14
    }
  ]

  let totalExercises = partsInfo[0].exercises + partsInfo[1].exercises + partsInfo[2].exercises 
  console.log(totalExercises)
  return (
    <div>
      {/* Calling Header component to render heading */}
      <Header course = {course} />

      {/* Calling Content component to render content */}
      <Content parts = {partsInfo}/>

      {/* Calling Total component to render total of exercises */}
      <Total exercises = {totalExercises}/>
    </div>
  )
}

export default App