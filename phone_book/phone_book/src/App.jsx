import axios from 'axios'
import {useState, useEffect} from 'react'
import personService from './services/persons'
import './index.css'

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handleNameChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow, deletePerson}) => {
  return (
    <ul>
      {personsToShow.map(person => 
      <li 
        key={person.name}>{person.name} {person.number}
        <button onClick={() => deletePerson(person.id)}>delete</button>
      </li>)}
    </ul>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect( () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber}
    if (newName === '' || newNumber === '') {
      alert('Name or number cannot be empty')
      return
    }
    if (persons.find(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to the phonebook`)
      return
    }
    if (persons.find(person => person.name === newName)) {
      if (persons.find(person => person.name === newName).number !== newNumber) {
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
          const id = persons.find(person => person.name === newName).id
          personService
            .update(id, {...personObject, id})
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
              setNewName('')
              setNewNumber('')
            })
            setErrorMessage(`Updated ${newName}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
        }
      }
      else {alert(`${newName} is already added to the phonebook`)}
      return
    }
    

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      setErrorMessage(`Added ${newName}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
  } 

  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name} ?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setShowAll(false)
    setFilter(event.target.value)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App