const Persons = ({person, deletePerson}) => {
  return (
    <li className="person">{person.name} {person.number}
    <button onClick={deletePerson}>Delete</button>
    </li>
  )
}

export default Persons