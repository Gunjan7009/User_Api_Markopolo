import React, { useState } from 'react';
import UserTable from './components/UserTable';
import { usePaginatedUsers } from './hooks/usePaginatedUsers';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import './App.css'; // 👈 Import the new CSS

function App() {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebouncedValue(searchInput, 500);
  const {
    users, hasMore, loading, error,
    loadMore, setSearch, setSortBy
  } = usePaginatedUsers();

  React.useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <div className="app-container">
      <div className="controls">
        <input
          className="input-field"
          placeholder="Search by name or email"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <select
          className="select-field"
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>

      {error && <p className="message error">{error}</p>}
      {loading && <p className="message loading">Loading...</p>}

      <UserTable data={users} loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
}

export default App;
