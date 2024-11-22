import { useState } from 'react'
import { PersonModel } from './models/PersonModels'
import { AddNumber } from './components/AddNumber'
import { Numbers } from './components/Numbers'
import { Header } from './components/utils'


const App = () => {
  const [persons, setPersons] = useState([new PersonModel(1, 'Arto Hellas', '040-123456')]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const onNameChange = (event) => setNewName(event.target.value);
  const onNumberChange = (event) => setNewNumber(event.target.value);

  const personExists = (persons, name, number) => 
    persons.find(person => person.name === name && person.number === number);

  const onSubmit = (event) => {
    event.preventDefault();

    // Clear input fields
    setNewName('');
    setNewNumber('');

    if (personExists(persons, newName, newNumber)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = new PersonModel(persons.length + 1, newName, newNumber);
    setPersons(persons.concat(newPerson));
  }

  return (
    <div>
      <Header text={'Phonebook'}/>
      <AddNumber newName={newName} newNumber={newNumber} onNameChange={onNameChange} onNumberChange={onNumberChange} onSubmit={onSubmit}/>
      <Numbers persons={persons} />
    </div>
  )
}

export default App