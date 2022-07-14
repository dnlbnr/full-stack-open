import CountryListItem from './CountryListItem';

const CountryList = ({ countries }) => {
  return countries.map((country) => (
    <CountryListItem key={country.cca2} country={country} />
  ));
};

export default CountryList;
