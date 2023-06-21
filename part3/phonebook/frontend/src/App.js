import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  return (
    <div class="app">
      <h2>Phonebook</h2>
      <Notification message={message} status={status} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new name and number</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setMessage={setMessage}
        setStatus={setStatus}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        filter={filter}
        setMessage={setMessage}
        setStatus={setStatus}
      />
    </div>
  );
};

export default App;
