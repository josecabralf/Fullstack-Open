import { Header, Button } from "./utils";

const PersonsList = ({ persons, onRemove }) => 
  <div>{
    persons.map(person => 
      <div key={person.id}>
        {person.toString()}
        <Button text='delete' onClick={() => onRemove(person.id)} />
      </div>)}
  </div> 

const NoPersons = () => <div>No numbers to show</div>

export const Persons = ({ persons, onRemove  }) => {
  return (
    <>
      <Header text='Numbers' />
      {persons.length > 0 ? <PersonsList persons={persons} onRemove={onRemove} /> : <NoPersons />}
    </>
  );
}