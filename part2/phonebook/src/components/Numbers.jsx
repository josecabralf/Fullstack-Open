import { Header } from "./utils";

const NumbersList = ({ persons }) => 
  <div>{
    persons.map(person => 
      <div key={person.id}>
        {person.toString()}
      </div>)}
  </div> 

const NoNumbers = () => <div>No numbers to show</div>

export const Numbers = ({ persons }) => {
  return (
    <>
      <Header text='Numbers' />
      {persons.length > 0 ? <NumbersList persons={persons} /> : <NoNumbers />}
    </>
  );
}