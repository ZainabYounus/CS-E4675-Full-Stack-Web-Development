import Person from "./Person"

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

export default Persons