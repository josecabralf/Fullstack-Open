export const Filter = ({ search, handleFilterInput }) => 
    <input value={search} onInput={handleFilterInput} placeholder="Search name" />