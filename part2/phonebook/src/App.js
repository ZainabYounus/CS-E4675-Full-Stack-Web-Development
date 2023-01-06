import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {
  return(
    <div>
      filter shown with <input value = {props.filterValue} onChange = {props.handleFilterInput}/>
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange = {props.handleNameChange}/>
        </div>
        <div>
          <br/>
          number: <input value={props.newNumber} onChange = {props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
const Person = (props) => <p>{props.personObj.name}  {props.personObj.number}</p>

const Persons =(props) => {
  return(
    <div>
      {props.filteredResult.map(
        person => <Person key = {person.name} personObj={person}/>
        )}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [filteredResult, setFilterResult] = useState(persons)

  const hook = () => {
    personService.getAll()
    .then(responseData => {
        setPersons(responseData)
        setFilterResult(responseData)
    })
    .catch(err => {console.log(err)})
  }
  useEffect(hook, [])


  const addPerson = (event) => {

    const addPersonToServer = (personObject) => {
      personService.create(personObject)
      .then(responseData => console.log(responseData))
      .catch(console.log("contact could not be added"))
    }

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
      addPersonToServer(nameObject)
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
      <Filter filterValue = {filterValue} handleFilterInput = {handleFilterInput}/>

      <h2>add a new</h2>
      <PersonForm 
      addPerson={addPerson} 
      newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons filteredResult={filteredResult}/>
      
    </div>
  )
}

export default App