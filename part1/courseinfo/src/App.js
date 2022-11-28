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
      <Part  partName = {props.part1.name} exerciseNumber = {props.part1.exercises}/>
      <Part  partName = {props.part2.name} exerciseNumber = {props.part2.exercises}/>
      <Part  partName = {props.part3.name} exerciseNumber = {props.part3.exercises}/>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  let totalExercises = part1.exercises + part2.exercises + part3.exercises 

  return (
    <div>
      {/* Calling Header component to render heading */}
      <Header course = {course} />

      {/* Calling Content component to render content */}
      <Content part1 = {part1} part2 = {part2} part3 = {part3}/>

      {/* Calling Total component to render total of exercises */}
      <Total exercises = {totalExercises}/>
    </div>
  )
}

export default App