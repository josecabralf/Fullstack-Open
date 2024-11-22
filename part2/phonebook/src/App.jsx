import { useState } from 'react'
import { PersonModel } from './models/PersonModels'
import { Numbers } from './components/Numbers'
import { Header } from './components/utils'

const App = () => {
  const [persons, setPersons] = useState([new PersonModel(1, 'Arto Hellas')]) 
  const [newName, setNewName] = useState('')

  const onNameChange = (event) => setNewName(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    setNewName(''); // Clear the input field

    const personExists = persons.find(person => person.name === newName);
    if (personExists) {
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