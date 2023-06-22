import React from 'react';
import PropTypes from 'prop-types';
import personService from '../services/persons';

function Persons({
  persons, setPersons, filter, setMessage, setStatus,
}) {
  const personsToShow = persons.filter(
    (person) => person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          person={person}
          persons={persons}
          setPersons={setPersons}
          setMessage={setMessage}
          setStatus={setStatus}
        />
      ))}
    </div>
  );
}

function Person({
  person, persons, setPersons, setMessage, setStatus,
}) {
  const removePerson = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .catch(() => {
          setMessage(`Information of ${person.name} has already been removed from the server`);
          setStatus('error');
          setTimeout(() => setMessage(null), 2000);
        });
      setPersons(persons.filter((personToFilter) => personToFilter.id !== person.id));
    }
  };

  return (
    <div>
      {person.name}
      {' '}
      {person.number}
      {' '}
      <button type="submit" onClick={(removePerson)}>Delete</button>
    </div>
  );
}

Persons.propTypes = {
  persons: PropTypes.isRequired,
  setPersons: PropTypes.isRequired,
  filter: PropTypes.isRequired,
  setMessage: PropTypes.isRequired,
  setStatus: PropTypes.isRequired,
};

Person.propTypes = {
  person: PropTypes.isRequired,
  persons: PropTypes.isRequired,
  setPersons: PropTypes.isRequired,
  setMessage: PropTypes.isRequired,
  setStatus: PropTypes.isRequired,
};

export default Persons;
