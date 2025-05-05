const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Load data once at startup
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')));

router.get('/', (req, res) => {
  let { page = 1, limit = 50, search = '', sort = '' } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
    return res.status(400).json({ error: 'Invalid page or limit' });
  }

  // Filter
  let filtered = users;
  if (search) {
    const q = search.toLowerCase();
    filtered = users.filter(u =>
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }

  // Sort
  if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === 'email') filtered.sort((a, b) => a.email.localeCompare(b.email));

  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  res.json({
    data,
    total: filtered.length,
    page,
    limit,
  });
});

module.exports = router;
