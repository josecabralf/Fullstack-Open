import { useState, useEffect } from 'react'
import { getAll, create, remove, update } from './services/phonebook'
import { PersonModel } from './models/PersonModels'
import { NotificationModel } from './models/NotificationModel'
import { Filter } from './components/Filter'
import { Header } from './components/utils'
import { Notification } from './components/Notification'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearchName, setNewSearchName] = useState('');
  const [notification, setNotification] = useState(null);

  const onNameChange = (e) => setNewName(e.target.value);
  const onNumberChange = (e) => setNewNumber(e.target.value);
  const onSearchNameInput = (e) => setNewSearchName(e.target.value);

  const setTemporalNotification = (message, type) => {
    setNotification(new NotificationModel(message, type));
    setTimeout(() => setNotification(null), 5000);
  }

  const fetchPersons = () => {
    getAll()
      .then(resp => {
        const persons = resp.map(p => new PersonModel(p.id, p.name, p.number));
        setPersons(persons);
      })
      .catch(_ => setTemporalNotification('Failed to fetch data', 'error'));
  }

  useEffect(fetchPersons);

  const clearInputFields = () => {
    setNewName('');
    setNewNumber('');
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const existing = persons.find(p => p.name === newName);
    if (!existing) {
      create({ name: newName, number: newNumber })
      .then(resp => {
        const newPerson = new PersonModel(resp.id, resp.name, resp.number);
        setPersons(persons.concat(newPerson));
        clearInputFields();
        setTemporalNotification(`Added ${newPerson.name}`, 'success');
      })
      .catch(e => {
        const message = e.response.data.error || 'Unknown error';
        setTemporalNotification(`${newName} could not be created :(\nError: ${message}`, 'error');
      });
      
      return;
    }

    if (!window.confirm(`${newName} is already added to phonebook? \nReplace the old number with a new one?`))
      return;

    update(existing.id, { name: newName, number: newNumber })
      .then(resp => {
        const updatedPerson = new PersonModel(resp.id, resp.name, resp.number);
        setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p));
        clearInputFields();
        setTemporalNotification(`Updated ${updatedPerson.name}`, 'success');
      })
      .catch(e => {
        const message = e.response.data.error || 'Unknown error';
        setTemporalNotification(`${newName} could not be updated :(\nError: ${message}`, 'error');
      });
  }

  const onRemove = (id) => {
    const person = persons.find(p => p.id === id);
    if (!window.confirm(`Delete ${person.name}?`))
      return;

    remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
      })
      .catch(err => {
        const message = err.response.data.error || 'Unknown error';
        setTemporalNotification(`${person.name} could not be removed :(\nError: ${message}`, 'error');
      });
  }

  const peopleToShow = newSearchName.length > 0
    ? persons.filter(p => p.name.toLowerCase().includes(newSearchName.toLowerCase()))
    : persons;

  return (
    <div>
      <Header text={'Phonebook'}/>
      <Notification notification={notification} />
      <Filter search={newSearchName} handleFilterInput={onSearchNameInput} />
      <PersonForm newName={newName} newNumber={newNumber} onNameChange={onNameChange} onNumberChange={onNumberChange} onSubmit={onSubmit}/>
      <Persons persons={peopleToShow} onRemove={onRemove} />
    </div>
  )
}

export default App