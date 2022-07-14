const Search = ({ searchTerm, onChange }) => {
  return (
    <div>
      find countries{' '}
      <input type='text' value={searchTerm} onChange={onChange} />
    </div>
  );
};

export default Search;
