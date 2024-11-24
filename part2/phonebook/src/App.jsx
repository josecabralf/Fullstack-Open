import axios from 'axios'
import { useState, useEffect } from 'react'
import { PersonModel } from './models/PersonModels'
import { Filter } from './components/Filter'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { Header } from './components/utils'


const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(resp => {
        const persons = resp.data.map(p => new PersonModel(p.id, p.name, p.number));
        setPersons(persons);
      });
  });

  const [newName, setNewName] = useState('');
  const onNameChange = (e) => setNewName(e.target.value);

  const [newNumber, setNewNumber] = useState('');
  const onNumberChange = (e) => setNewNumber(e.target.value);

  const [newSearchName, setNewSearchName] = useState('');
  const onSearchNameInput = (e) => setNewSearchName(e.target.value);

  const clearInputFields = () => {
    setNewName('');
    setNewNumber('');
  }

  const onSubmit = (e) => {
    e.preventDefault();
    clearInputFields();

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