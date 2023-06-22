import React from 'react';
import PropTypes from 'prop-types';

function Filter({ filter, setFilter }) {
  return (
    <form>
      <div>
        Filter shown with
        <input value={filter} onChange={(event) => setFilter(event.target.value)} />
      </div>
    </form>
  );
}
Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Filter;
