const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 3001;

app.use(cors());
app.use('/api/users', userRoutes);
app.get('/api/users', (req, res) => {
    const { page = 1, limit = 50, search = '', sort = '' } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
  
    let filtered = users;
  
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q)
      );
    }
  
    if (sort === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'email') {
      filtered = filtered.sort((a, b) => a.email.localeCompare(b.email));
    }
  
    const start = (pageNum - 1) * limitNum;
    const paginated = filtered.slice(start, start + limitNum);
  
    res.json({
      data: paginated,
      total: filtered.length,
      page: pageNum,
      limit: limitNum,
    });
  });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
