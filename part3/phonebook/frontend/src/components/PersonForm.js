import personService from '../services/persons'

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setMessage, setStatus }) => {  
    const addPerson = (event) => {
      event.preventDefault()
      if (persons.find(person => person.name === newName)) {
        alert(`${newName} is already added to phonebook`)
      } else {
        const personObject = {name: newName, number: newNumber}
  
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`Added ${newName}`)
            setStatus('success')
            setTimeout(() => setMessage(null), 2000)
          })
      }
    }
  
    return (
      <form onSubmit={addPerson}>
        <div>Name: <input value={newName} onChange={(event) => setNewName(event.target.value)} /></div>
        <div>Number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} /></div>
        <div><button type="submit">Add</button></div>
      </form>
    )
}

export default PersonForm