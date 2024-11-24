import { useState, useEffect } from 'react'
import { getAll, create, remove } from './services/phonebook'
import { PersonModel } from './models/PersonModels'
import { Filter } from './components/Filter'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { Header } from './components/utils'


const App = () => {
  const [persons, setPersons] = useState([]);

  const fetchPersons = () => {
    getAll().then(resp => {
        const persons = resp.map(p => new PersonModel(p.id, p.name, p.number));
        setPersons(persons);
      });
  }

  useEffect(fetchPersons);

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

    create({ name: newName, number: newNumber })
      .then(resp => {
        const newPerson = new PersonModel(resp.id, resp.name, resp.number);
        setPersons(persons.concat(newPerson));
      });
  }

  const onRemove = (id) => {
    const person = persons.find(p => p.id === id);
    if (!window.confirm(`Delete ${person.name}?`))
      return;

    remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
      });
  }

  const peopleToShow = newSearchName.length > 0
    ? persons.filter(p => p.name.toLowerCase().includes(newSearchName.toLowerCase()))
    : persons;

  return (
    <div>
      <Header text={'Phonebook'}/>
      <Filter search={newSearchName} handleFilterInput={onSearchNameInput} />
      <PersonForm newName={newName} newNumber={newNumber} onNameChange={onNameChange} onNumberChange={onNumberChange} onSubmit={onSubmit}/>
      <Persons persons={peopleToShow} onRemove={onRemove} />
    </div>
  )
}

export default App