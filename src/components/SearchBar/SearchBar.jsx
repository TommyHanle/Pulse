import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMade, setSearchMade] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
    setSearchTerm('');
    setSearchMade(true);
  };

  return (
    <div id="search-bar-container" className={searchMade ? 'search-made' : ''}>
      <form onSubmit={handleSubmit}>
        <div id="search-bar">
          <input
            type="text"
            placeholder="Enter a Zipcode..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
}

