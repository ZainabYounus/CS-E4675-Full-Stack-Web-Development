const Header = (props) => {
  return (
    <h1>{props.course}</h1>
    // <div>
    //   <h1>{props.course}</h1>
    // </div>
  )
}


const Content = (props) => {
  return (
    <p>
      {props.partName} {props.exerciseNumber}
    </p>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      {/* Calling Header component to render heading */}
      <Header course = {course} />

      {/* Calling Content component to render content */}
      <Content partName = {part1} exerciseNumber = {exercises1}/>
      <Content partName = {part2} exerciseNumber = {exercises2}/>
      <Content partName = {part3} exerciseNumber = {exercises3}/>

      {/* Calling Total component to render total of exercises */}
      <Total exercises1 = {exercises1} exercises2 = {exercises2} exercises3 = {exercises3}/>
    </div>
  )
}

export default App