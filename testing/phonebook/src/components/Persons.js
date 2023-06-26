import personService from '../services/persons';

function Persons({
  persons, setPersons, filter, handleNotification,
}) {
  const personsToShow = persons.filter((person) => (
    person.name.toLowerCase().includes(filter.toLowerCase())
  ));

  return (
    <div>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          persons={persons}
          setPersons={setPersons}
          person={person}
          handleNotification={handleNotification}
        />
      ))}
    </div>
  );
}

function Person({
  persons, setPersons, person, handleNotification,
}) {
  const removePerson = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .catch(() => {
          handleNotification(`Information of ${person.name} has already been removed from the server`, 'error');
        });
      setPersons(persons.filter((currentPersons) => currentPersons.id !== person.id));
    }
  };

  return (
    <div>
      {person.name}
      {' '}
      {person.number}
      {' '}
      <button onClick={removePerson} type="button">Delete</button>
    </div>
  );
}

export default Persons;
