export const Filter = ({ search, onInput, text }) => 
    <>
        {text}
        <input value={search} onInput={onInput} placeholder="Search country" />
    </>