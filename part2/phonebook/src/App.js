import { useState } from 'react'

const Person = (props) => <p>{props.personObj.name}  {props.personObj.number}</p>

// const Display =(props) => {
//   return(
//     <div>
//       {props.object.map(
//         person => <Person key = {person.name} personObj={person}/>
//         )}
//     </div>
//   )
// }

const App = () => {
  const [persons, setPersons] = useState([
    { id:1, name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [filteredResult, setFilterResult] = useState(persons)


  const addPerson = (event) => {
    event.preventDefault()
    const isNameExist = persons.filter(person => person.name === newName).length > 0 ? true : false

    if(isNameExist){
      alert(`${newName} is already added to phonebook`)
    }

    else{
      const nameObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      setFilterResult(filteredResult.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) =>{
    const isMatchFound = persons.filter(person => person.name.toLowerCase().match(event.target.value.toLowerCase()))
    isMatchFound.length > 0 ? setFilterResult(isMatchFound) : setFilterResult(persons)
    setFilterValue(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value = {filterValue} onChange = {handleFilterInput}/>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange = {handleNameChange}/>
        </div>
        <div>
          <br/>
          number: <input value={newNumber} onChange = {handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {filteredResult.map(
        person => <Person key = {person.name} personObj={person}/>
        )}
      {/* <Display object={filteredResult}/> */}
    </div>
  )
}

export default App