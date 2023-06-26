import React, { useState, useEffect } from 'react';
import personService from './services/persons';

import Notification from './components/Notification';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

function App() {
  const [filter, setFilter] = useState('');
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState({ message: null });

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNotification = (message, status = '') => {
    setNotification({ message, status });
    setTimeout(() => { setNotification({ message: null }); }, 2000);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new number</h2>
      <PersonForm
        handleNotification={handleNotification}
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        filter={filter}
        handleNotification={handleNotification}
        persons={persons}
        setPersons={setPersons}
      />
    </>
  );
}

export default App;
