import PersonDetails from './PersonDetails';

const Persons = ({ persons, filter }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <PersonDetails key={person.name} person={person} />
        ))}
    </ul>
  );
};

export default Persons;
