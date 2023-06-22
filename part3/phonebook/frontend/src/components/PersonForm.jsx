import React from 'react';
import PropTypes from 'prop-types';
import personService from '../services/persons';

function PersonForm({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setMessage,
  setStatus,
}) {
  const success = () => {
    setNewName('');
    setNewNumber('');
    setStatus('success');
    setTimeout(() => setMessage(null), 2000);
  };

  const catchError = (error) => {
    setMessage(`${error.response.data.error}`);
    setStatus('error');
    setTimeout(() => setMessage(null), 2000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };

    if (persons.find((person) => person.name === newName)) {
      const personIndex = persons.findIndex(
        (person) => person.name === newName,
      );

      personService
        .update(persons[personIndex].id, personObject)
        .then((returnedPerson) => {
          const newPeople = persons;

          newPeople[personIndex].number = returnedPerson.number;
          setPersons(newPeople);
          setMessage(`Updated ${newName}`);
          success();
        })
        .catch(catchError);
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage(`Added ${newName}`);
          success();
        })
        .catch(catchError);
    }
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        Name:
        {' '}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        Number:
        {' '}
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

PersonForm.propTypes = {
  persons: PropTypes.isRequired,
  setPersons: PropTypes.isRequired,
  newName: PropTypes.isRequired,
  setNewName: PropTypes.isRequired,
  newNumber: PropTypes.isRequired,
  setNewNumber: PropTypes.isRequired,
  setMessage: PropTypes.isRequired,
  setStatus: PropTypes.isRequired,
};

export default PersonForm;
