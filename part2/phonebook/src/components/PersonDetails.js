const PersonDetails = ({ person }) => {
  return (
    <li key={person.name}>
      {person.name}: {person.number}
    </li>
  );
};

export default PersonDetails;
