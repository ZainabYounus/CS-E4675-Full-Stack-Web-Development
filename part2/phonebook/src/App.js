import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [filteredResult, setFilterResult] = useState(persons)
  const [notificationColor, setNotificationColor] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')

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

          setNotificationColor('green')
          setNotificationMessage(`Updated phone number of ${responseData.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)

        })
        .catch(err=> {
          setPersons(persons.filter(person => person.id !== existingPerson.id))
          setFilterResult(filteredResult.filter(person => person.id !== existingPerson.id))

          setNotificationColor('red')
          setNotificationMessage(`Information of ${existingPerson.name} has already been removed from server`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
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

        setNotificationColor('green')
        setNotificationMessage(`Added ${responseData.name}`)

        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)

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
    setFilterResult(isMatchFound)
    setFilterValue(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notificationMessage !== '' ? <Notification color={notificationColor} message = {notificationMessage}/> : <></>}
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