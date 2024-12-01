import PropTypes from 'prop-types';
import { Header, Button } from "./utils";

const PersonsList = ({ persons, onRemove }) => 
  <div>{
    persons.map(person => 
      <div key={person.id}>
        {person.toString()}
        <Button text='delete' onClick={() => onRemove(person.id)} />
      </div>)}
  </div> 

PersonsList.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemove: PropTypes.func.isRequired,
};

const NoPersons = () => <div>No numbers to show</div>

export const Persons = ({ persons, onRemove  }) => {
  return (
    <>
      <Header text='Numbers' />
      {persons.length > 0 ? <PersonsList persons={persons} onRemove={onRemove} /> : <NoPersons />}
    </>
  );
}

Persons.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemove: PropTypes.func.isRequired,
};