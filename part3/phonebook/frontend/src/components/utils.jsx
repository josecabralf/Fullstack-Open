import PropTypes from 'prop-types';

export const Header = ({ text }) => { 
  return <h2>{text}</h2>; 
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

export const SubmitButton = ({ text }) => (
  <button type="submit">{text}</button>
);

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};