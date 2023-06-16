import personService from '../services/persons'

const Persons = ({ persons, setPersons, filter, setMessage, setStatus }) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return <div>{personsToShow.map(person => <Person key={person.id} person={person} persons={persons} setPersons={setPersons} setMessage={setMessage} setStatus={setStatus} />)}</div>
}

const Person = ({ person, persons, setPersons, setMessage, setStatus }) => {
    const removePerson = () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .deletePerson(person.id)
                .catch(error => {
                    setMessage(`Information of ${person.name} has already been removed from the server`)
                    setStatus('error')
                    setTimeout(() => setMessage(null), 2000)
                  })
            setPersons(persons.filter(persons => persons.id !== person.id))
        }
    }

    return <div>{person.name} {person.number} <button onClick={removePerson}>Delete</button></div>
}

export default Persons