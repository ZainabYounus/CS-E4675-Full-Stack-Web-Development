import { useState } from 'react'

const Person = (props) => <p>{props.personObj.name}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const isNameExist = persons.filter(person => person.name === newName).length > 0 ? true : false

    if(isNameExist){
      alert(`${newName} is already added to phonebook`)
    }

    else{
      const nameObject = {
        name: newName,
      }
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange = {handleNameChange}/>
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