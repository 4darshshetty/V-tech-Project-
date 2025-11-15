const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// register - only creates users, admin must be created manually
router.post('/signup', async (req,res)=>{
  try{
    const { name,email,password } = req.body;
    const exist = await User.findOne({ email });
    if(exist) return res.status(400).json({ msg: 'Email already used' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash, role: 'user' });
    await user.save();
    res.json({ msg: 'User created' });
  }catch(e){ res.status(500).json({ error: e.message }); }
});

// login
router.post('/login', async (req,res)=>{
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ msg: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  }catch(e){ res.status(500).json({ error: e.message }); }
});

module.exports = router;
