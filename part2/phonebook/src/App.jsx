import { useState } from 'react'
import { PersonModel } from './models/PersonModels'
import { Numbers } from './components/Numbers'
import { Header } from './components/utils'


const App = () => {
  const [persons, setPersons] = useState([new PersonModel(1, 'Arto Hellas')]) 
  const [newName, setNewName] = useState('')

  const onNameChange = (event) => setNewName(event.target.value);

  const personExists = (persons, name) => persons.find(person => person.name === name);

  const onSubmit = (event) => {
    event.preventDefault();
    setNewName(''); // Clear the input field

    if (personExists(persons, newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = new PersonModel(persons.length + 1, newName);
    setPersons(persons.concat(newPerson));
  }

  return (
    <div>
      <Header text={'Phonebook'}/>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <Numbers persons={persons} />
    </div>
  )
}

export default App