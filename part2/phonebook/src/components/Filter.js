const Filter = ({ filter, updateFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={updateFilter} />
    </div>
  );
};

export default Filter;
