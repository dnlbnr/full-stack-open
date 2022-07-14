import PersonDetails from './PersonDetails';

const Persons = ({ persons, filter, deletePerson }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <PersonDetails
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person)}
          />
        ))}
    </ul>
  );
};

export default Persons;
