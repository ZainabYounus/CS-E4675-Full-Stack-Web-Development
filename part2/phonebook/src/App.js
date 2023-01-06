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
const Person = (props) => {

  const removePerson = (personObj) => {
    if (window.confirm(`Delete ${personObj.name}?`)) {
      personService.remove(personObj.id)
      .then(responseData => {
        console.log(responseData)
        props.setPersons(props.persons.filter(p => p.id !== personObj.id))
        props.setFilterResult(props.filteredResult.filter(p => p.id !== personObj.id))
      })
      .catch(err=> console.log(err))
    }
  }


  return(
    <div>
      {props.personObj.name}  {props.personObj.number}
      <button onClick={() => removePerson(props.personObj)}>Delete</button>
    </div>
  )
}

const Persons =(props) => {

  return(
    <div>
      {props.filteredResult.map(
        person => <Person 
        key = {person.name} personObj={person} 
        filteredResult={props.filteredResult} setFilterResult={props.setFilterResult} 
        persons={props.persons} setPersons={props.setPersons}
        />
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

    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if(existingPerson){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        //make a PUT request to update the person
        const updatedObject = {
          ...existingPerson, number: newNumber
        }
        personService.update(updatedObject)
        .then(responseData => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : responseData))
          setFilterResult(filteredResult.map(person => person.id !== existingPerson.id ? person : responseData))
        })
        .catch(err => console.log(err))
      }
    }

    else{
      const nameObject = {
        name: newName,
        number: newNumber
      }

      personService.create(nameObject)
      .then(responseData => {
        console.log(responseData)

        setPersons(persons.concat(responseData))
        setFilterResult(filteredResult.concat(responseData))
      })
      .catch(err=> console.log(err))
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
      <Persons 
      filteredResult={filteredResult} setFilterResult={setFilterResult} 
      persons={persons} setPersons={setPersons}
      />
      
    </div>
  )
}

export default App