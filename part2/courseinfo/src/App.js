const Part = ({part}) => <p> {part.name} {part.exercises} </p>

const Header = ({name}) => <h1> {name} </h1>

const Content = ({courseParts}) => 
  <div>
    {courseParts.map(part => 
        <Part key={part.id} part={part} />
    )}
  </div>

const Course = (props) => {
  return(
    <div>
      <Header name = {props.course.name}></Header>
      <Content courseParts = {props.course.parts}></Content>
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
      }
    ]
  }

  return <Course course={course} />
}

export default App