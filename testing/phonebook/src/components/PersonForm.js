import personService from '../services/persons';

function PersonForm({
  handleNotification, persons, newName, newNumber, setPersons, setNewName, setNewNumber,
}) {
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      handleNotification(`${newName} is already added to phonebook`, 'error');
    } else {
      const personObject = { name: newName, number: newNumber };

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          handleNotification(`Added ${returnedPerson.name}`, 'success');
        });
    }
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        Name:
        <input value={newName} onChange={(event) => setNewName(event.target.value)} />
      </div>
      <div>
        Number:
        <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
      </div>
      <div><button type="submit">Add</button></div>
    </form>
  );
}

export default PersonForm;
