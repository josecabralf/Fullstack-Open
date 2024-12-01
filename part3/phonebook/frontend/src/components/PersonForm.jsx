import PropTypes from 'prop-types';
import { Header, SubmitButton } from './utils';

const InputField = ({ label, value, onChange }) => 
  <div>
    {label}: <input value={value} onChange={onChange} />
  </div>;

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

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
  );
};

PersonForm.propTypes = {
  newName: PropTypes.string.isRequired,
  newNumber: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onNumberChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};