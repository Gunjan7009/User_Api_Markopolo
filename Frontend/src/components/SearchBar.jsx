import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');
  const [debounce, setDebounce] = useState(null);

  useEffect(() => {
    if (debounce) clearTimeout(debounce);
    setDebounce(setTimeout(() => onSearch(term), 500));
  }, [term]);

  return (
    <input
      className="p-2 border rounded w-full"
      type="text"
      placeholder="Search name or email"
      value={term}
      onChange={(e) => setTerm(e.target.value)}
    />
  );
};

export default SearchBar;
