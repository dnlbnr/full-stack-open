import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchResults from './components/SearchResults';
import Search from './components/Search';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(({ data }) => setCountries(data));
  }, []);

  const updateSearchTerm = (event) => setSearchTerm(event.target.value);

  return (
    <>
      <Search searchTerm={searchTerm} onChange={updateSearchTerm} />
      <SearchResults countries={countries} searchTerm={searchTerm} />
    </>
  );
}

export default App;
