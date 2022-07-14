import { useState } from 'react';
import CountryDetails from './CountryDetails';

const CountryListItem = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div>
      <p key={country.cca2}>
        {country.name.common}{' '}
        <button onClick={toggleDetails}>{showDetails ? 'hide' : 'show'}</button>
      </p>
      {showDetails && <CountryDetails country={country} />}
    </div>
  );
};

export default CountryListItem;
