const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req,res)=>{
  const c = new Contact(req.body);
  await c.save();
  res.json({ msg: 'Message received' });
});

module.exports = router;
