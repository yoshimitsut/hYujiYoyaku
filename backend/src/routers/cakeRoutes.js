const express = require('express');
const router = express.Router();
const pool = require('../config/db'); 

// Lista bolos com tamanhos e estoque
router.get('/', async (req, res) => {
  try {
    const [cakes] = await pool.query('SELECT * FROM cakes');
    const [sizes] = await pool.query('SELECT * FROM cake_sizes');

    const result = cakes.map(cake => ({
      ...cake,
      sizes: sizes.filter(s => s.cake_id === cake.id)
    }));

    res.json({ success: true, cakes: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Erro ao buscar bolos' });
  }
});

module.exports = router;