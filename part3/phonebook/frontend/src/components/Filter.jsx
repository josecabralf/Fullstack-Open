import PropTypes from 'prop-types';

export const Filter = ({ search, handleFilterInput }) => 
    <input value={search} onInput={handleFilterInput} placeholder="Search name" />;

Filter.propTypes = {
    search: PropTypes.string.isRequired,
    handleFilterInput: PropTypes.func.isRequired,
};