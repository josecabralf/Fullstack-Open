export const Header = ({ text }) => { return <h2>{text}</h2> }

export const SubmitButton = ({ text }) => <button type="submit">{text}</button>

export const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>
