import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService
      .getAll('http://localhost:3001/persons')
      .then((persons) => setPersons(persons));
  }, []);

  const updateFilter = (event) => {
    setFilter(event.target.value);
  };

  const updatePerson = () => {
    const id = persons.find((el) => el.name === newPerson.name).id;
    personService
      .update(id, newPerson)
      .then((updatedPerson) =>
        setPersons(
          persons.map((currentPerson) =>
            currentPerson.id === updatedPerson.id
              ? updatedPerson
              : currentPerson
          )
        )
      );
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (
      persons.find((el) => el.name === newPerson.name) &&
      window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      updatePerson();
      return;
    }
    personService
      .create(newPerson)
      .then((person) => {
        setPersons([...persons, person]);
        setNewPerson({ name: '', number: '' });
      })
      .catch((error) => {
        console.log(error);
        alert('Error while adding person to the phone book. Please try again.');
      });
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() =>
          setPersons(
            persons.filter((existingPerson) => existingPerson.id !== person.id)
          )
        );
    }
  };

  const updateNewPerson = ({ target }) => {
    setNewPerson({
      ...newPerson,
      [target.name]: target.value,
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} updateFilter={updateFilter} />
      <h3>add a new</h3>
      <PersonForm
        onChange={updateNewPerson}
        onSubmit={addPerson}
        newPerson={newPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
