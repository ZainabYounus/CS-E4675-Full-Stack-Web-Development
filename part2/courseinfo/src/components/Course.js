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

  export default Course