const Filter = (props) => {
    return(
      <div>
        filter shown with <input value = {props.filterValue} onChange = {props.handleFilterInput}/>
      </div>
    )
}

export default Filter