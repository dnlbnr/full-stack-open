import { useState, useEffect } from 'react';
import Notification from './components/Notification';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filter, setFilter] = useState('');
  const [successAlert, setSuccessAlert] = useState();
  const [errorAlert, setErrorAlert] = useState();

  useEffect(() => {
    personService
      .getAll('http://localhost:3001/persons')
      .then((persons) => setPersons(persons));
  }, []);

  const updateFilter = (event) => {
    setFilter(event.target.value);
  };

  const showSuccess = (message) => {
    setSuccessAlert(message);
    setTimeout(() => setSuccessAlert(null), 5000);
  };

  const showError = (message) => {
    setErrorAlert(message);
    setTimeout(() => setErrorAlert(null), 5000);
  };

  const updatePerson = () => {
    const id = persons.find((el) => el.name === newPerson.name).id;
    personService
      .update(id, newPerson)
      .then((updatedPerson) => {
        setPersons(
          persons.map((currentPerson) =>
            currentPerson.id === updatedPerson.id
              ? updatedPerson
              : currentPerson
          )
        );
        showSuccess(`${newPerson.name} updated successfully`);
      })
      .catch((error) => {
        console.log(error);
        showError(`${newPerson.name} is not in the phonebook anymore`);
        setPersons(persons.filter((el) => el.name !== newPerson.name));
      });
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
        showSuccess(`${person.name} added successfully`);
      })
      .catch((error) => {
        console.log(error);
        showError(
          'Error while adding person to the phone book. Please try again.'
        );
      });
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(
            persons.filter((existingPerson) => existingPerson.id !== person.id)
          );
          showSuccess(`${person.name} deleted successfully`);
        })
        .catch((error) => {
          console.log(error);
          showError(`${person.name} was already deleted`);
          setPersons(persons.filter((el) => el.name !== person.name));
        });
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
      {successAlert && <Notification success message={successAlert} />}
      {errorAlert && <Notification error message={errorAlert} />}
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
