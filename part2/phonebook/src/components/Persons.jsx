import { Header } from "./utils";

const PersonsList = ({ persons }) => 
  <div>{
    persons.map(person => 
      <div key={person.id}>
        {person.toString()}
      </div>)}
  </div> 

const NoPersons = () => <div>No numbers to show</div>

export const Persons = ({ persons }) => {
  return (
    <>
      <Header text='Numbers' />
      {persons.length > 0 ? <PersonsList persons={persons} /> : <NoPersons />}
    </>
  );
}