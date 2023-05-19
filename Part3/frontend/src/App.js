import { useState, useEffect } from 'react'
import axios from 'axios'

import Persons from './components/Persons'
import FilterPerson from './components/FilterPerson'
import AddPerson from './components/AddPerson'
import Notification from './components/Notification'
import personService from './services/persons'




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    // console.log('effect')
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setPersons(response.data)
    //   })
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const nameExists = persons.find(el => el.name.toUpperCase() == newName.toUpperCase())
    const numberExists = persons.find(el => el.number == newNumber)

    if (nameExists && numberExists) {
      alert(`${newName} is already added to phonebook`)
    } else if (nameExists && !numberExists) {
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (window.confirm) {
        updateNumber(nameExists, newNumber)
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setInfoMessage(`${returnedPerson.name} has been added to the phonebook.`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000);
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')          
        })
        .catch(error => {
          console.log(error.response.data.error);
          setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNewName('')
        setNewNumber('')   
        })
    }
    // axios 
    //   .post('http://localhost:3001/persons', newPerson)
    //   .then(response => {
    //     setPersons(persons.concat(response.data))
    //     setNewName('')
    //     setNewNumber('')
    //   })
  }

  const updateNumber = (nameExists, newNumber) => {
    const updatedPerson = { ...nameExists, 'number': newNumber }
    const id = nameExists.id
    personService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setInfoMessage(`${returnedPerson.name}'s Number has been updated.`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000);
        setPersons(persons.map(el => el.name === returnedPerson.name ? returnedPerson : el))
        setNewName('')
        setNewNumber('')      
      })
      .catch(error => {
          console.log(error.response.data.error);
          setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNewName('')
        setNewNumber('') 
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .del(id)
        .then(() => {
          setInfoMessage(`${person.name} has been deleted from the phonebook.`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000);
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          setErrorMessage(`${person.name} was already deleted from server.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
          setPersons(persons.filter(el => el.id !== person.id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }

  const namesToShow = newFilter ? persons.filter(el => el.name.toLowerCase().includes(newFilter)) : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification info={infoMessage} error={errorMessage}/>
      <FilterPerson
        newFilter={newFilter}
        handleFilter={handleFilter} />
      <h3>Add a new person</h3>
      <AddPerson
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <ul>{namesToShow.map(el =>
        <Persons
          key={el.name}
          person={el}
          deletePerson={() => deletePerson(el.id)} />
      )}</ul>
    </div>
  )
}

export default App 