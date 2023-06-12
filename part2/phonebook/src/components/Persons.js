import personService from '../services/persons'

const Persons = ({ persons, setPersons, filter }) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>{personsToShow.map(person => <Person key={person.id} person={person} persons={persons} setPersons={setPersons} />)}</div>
    )
}

const Person = ({ person, persons, setPersons }) => {
    const removePerson = () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService.deletePerson(person.id)
            setPersons(persons.filter(persons => persons.id !== person.id))
        }
    }

    return (
        <div>{person.name} {person.number} <button onClick={removePerson}>Delete</button></div>
    )
}

export default Persons