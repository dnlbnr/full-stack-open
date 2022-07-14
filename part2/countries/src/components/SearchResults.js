import CountryDetails from './CountryDetails';
import CountryList from './CountryList';

const SearchResults = ({ countries, searchTerm }) => {
  const results = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      {searchTerm === '' ? (
        'Please enter a search term'
      ) : results.length > 10 ? (
        'Too many matches...'
      ) : results.length > 1 ? (
        <CountryList countries={results} />
      ) : results.length === 1 ? (
        <CountryDetails country={results[0]} />
      ) : (
        'No match found'
      )}
    </div>
  );
};

export default SearchResults;
