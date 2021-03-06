const PersonForm = ({ onSubmit, onChange, newPerson }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input name='name' value={newPerson.name} onChange={onChange} />
      </div>
      <div>
        number:{' '}
        <input name='number' value={newPerson.number} onChange={onChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
