import React from 'react';

const SelectDate = ({ sortBy, handleSortChange }) => {
  return (
    <select
      value={sortBy}
      onChange={handleSortChange}
      className="border px-4 py-2 mb-4"
    >
      <option value="recent">Plus récent</option>
      <option value="oldest">Plus ancien</option>
    </select>
  );
};

export default SelectDate;