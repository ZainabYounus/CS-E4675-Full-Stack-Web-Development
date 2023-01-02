import { useState } from 'react'

const Person = (props) => <p>{props.personObj.name}  {props.personObj.number}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const isNameExist = persons.filter(person => person.name === newName).length > 0 ? true : false

    if(isNameExist){
      alert(`${newName} is already added to phonebook`)
    }

    else{
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange = {handleNameChange}/>
          number: <input value={newNumber} onChange = {handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(
        person => <Person key = {person.name} personObj={person}/>
        )}
    </div>
  )
}

export default App