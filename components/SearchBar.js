import React from 'react';

const SearchBar = ({ searchQuery, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;