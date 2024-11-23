import { useState } from 'react'
import { PersonModel } from './models/PersonModels'
import { Filter } from './components/Filter'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { Header } from './components/utils'


const App = () => {
  const [persons, setPersons] = useState([
    new PersonModel(1, 'Arto Hellas', '040-123456'),
    new PersonModel(2, 'Ada Lovelace', '39-44-5323523'),
    new PersonModel(3, 'Dan Abramov', '12-43-234345'),
    new PersonModel(4, 'Mary Poppendieck', '39-23-642312'),
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearchName, setNewSearchName] = useState('');

  const onNameChange = (event) => setNewName(event.target.value);
  const onNumberChange = (event) => setNewNumber(event.target.value);
  const onSearchNameInput = (event) => setNewSearchName(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();

    // Clear input fields
    setNewName('');
    setNewNumber('');

    const existing = persons.find(p => p.name === newName && p.number === newNumber);
    if (existing) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = new PersonModel(persons.length + 1, newName, newNumber);
    setPersons(persons.concat(newPerson));
  }

  return (
    <div>
      <Header text={'Phonebook'}/>
      <Filter search={newSearchName} handleFilterInput={onSearchNameInput} />
      <PersonForm newName={newName} newNumber={newNumber} onNameChange={onNameChange} onNumberChange={onNumberChange} onSubmit={onSubmit}/>
      <Persons persons={newSearchName.length > 0 
        ? persons.filter(p => p.name.toLowerCase().includes(newSearchName.toLowerCase())) 
        : persons} />
    </div>
  )
}

export default App