import axios from 'axios';

export const fetchUsers = async ({ page, limit, search, sort }) => {
  const res = await axios.get('http://localhost:3001/api/users', {
    params: { page, limit, search, sort },
  });
  return res.data;
};
