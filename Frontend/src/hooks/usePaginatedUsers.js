// import { useState, useEffect, useCallback } from 'react';
// import { fetchUsers } from '../api/users';

// export const usePaginatedUsers = (limit = 50, search = '', sort = '') => {
//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const loadMore = useCallback(async () => {
//     if (loading || !hasMore) return;
//     setLoading(true);
//     try {
//       const data = await fetchUsers({ page, limit, search, sort });
//       setUsers(prev => [...prev, ...data.data]);
//       setHasMore(data.data.length === limit);
//       setPage(prev => prev + 1);
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [page, limit, search, sort, hasMore, loading]);

//   useEffect(() => {
//     setUsers([]);
//     setPage(1);
//     setHasMore(true);
//   }, [search, sort]);

//   useEffect(() => {
//     loadMore();
//   }, [loadMore]);

//   return { users, loadMore, hasMore, loading, error };
// };
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/users';

export function usePaginatedUsers() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL, {
        params: {
          page: reset ? 1 : page,
          limit: 50,
          search,
          sort: sortBy,
        },
      });
      console.log(res.data);
      const newUsers = res.data.data;

      setUsers(prev => reset ? newUsers : [...prev, ...newUsers]);
      setHasMore((reset ? newUsers.length : prev.length + newUsers.length) < res.data.total);
      setPage(prev => reset ? 2 : prev + 1);
    } catch (err) {
      setError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  }, [page, search, sortBy]);

  const resetAndFetch = () => {
    setPage(1);
    fetchUsers(true);
  };

  useEffect(() => {
    resetAndFetch();
  }, [search, sortBy]);

  return {
    users,
    hasMore,
    loading,
    error,
    loadMore: () => fetchUsers(),
    setSearch,
    setSortBy,
  };
}
