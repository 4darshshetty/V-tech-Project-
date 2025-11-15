const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req,res)=>{
  try{
    const list = await Product.find().sort({ createdAt: -1 });
    res.json(list);
  }catch(e){ res.status(500).json({ error: e.message }); }
});

module.exports = router;
