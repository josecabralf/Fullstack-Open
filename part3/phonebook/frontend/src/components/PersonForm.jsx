import { Header, SubmitButton } from './utils'

const InputField = ({ label, value, onChange }) => 
    <div>
      {label}: <input value={value} onChange={onChange} />
    </div>

export const PersonForm = ({ newName, newNumber, onNameChange, onNumberChange, onSubmit }) => {
  return (
    <>
      <Header text='Add a new number' />
      <form onSubmit={onSubmit}>
        <InputField label='name' value={newName} onChange={onNameChange} />
        <InputField label='number' value={newNumber} onChange={onNumberChange} />
        <SubmitButton text='add' />
      </form>
    </>
    )
}