const Part = ({part}) => <p> {part.name} {part.exercises} </p>

const Header = ({name}) => <h1> {name} </h1>

const Content = ({courseParts}) => 
  <div>
    {courseParts.map(part => 
        <Part key={part.id} part={part} />
    )}
  </div>

const Total = ({parts}) => {

  let initialValue = 0

  const exercisesSum = parts.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.exercises;
    }, initialValue
  );
  
  return(
    <div>
      <b>total of {exercisesSum} exercises</b>
    </div>
  )
}
const Course = (props) => {
  return(
    <div>
      <Header name = {props.course.name}></Header>
      <Content courseParts = {props.course.parts}></Content>
      <Total parts = {props.course.parts}></Total>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App