export const TooMany = () => {
  return (
    <div>Too many matches, specify another filter</div>
  );
}

export const None = () => {
  return (
    <div>No matches</div>
  );
}

export const CountriesList = ({ countries }) => {
  return (
    <div>
      {countries.map(country => <div key={country.name.common}>{country.name.common}</div>)}
    </div>
  );
}

export const Country = ({ country }) => {
  const languages = Object.values(country.languages) || [];
  const capitals = country.capital.join(', ') || '';
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital: {capitals}</div>
      <div>area: {country.area}</div>
      <h3>Languages</h3>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.name.common} style={{ width: '200px' }} />
      </div>
  );
}