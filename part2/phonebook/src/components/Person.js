import personService from '../services/persons'

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

export default Person