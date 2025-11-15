const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { adminAuth } = require('../middleware/auth');
const Background = require('../models/Background');
const Product = require('../models/Product');
const Branch = require('../models/Branch');
const Contact = require('../models/Contact');

const storage = multer.diskStorage({
  destination: (req,file,cb)=> cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req,file,cb)=> cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Background routes
router.post('/background', adminAuth, upload.single('image'), async (req,res)=>{
  try{
    if(!req.file) return res.status(400).json({ msg: 'No file uploaded' });
    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    await Background.deleteMany({});
    const bg = new Background({ url });
    await bg.save();
    res.json({ msg: 'Background updated', url });
  }catch(e){ res.status(500).json({ error: e.message }); }
});

router.get('/background', async (req,res)=>{
  try{
    const bg = await Background.findOne().sort({ updatedAt: -1 });
    res.json({ url: bg ? bg.url : null });
  }catch(e){ res.status(500).json({ error: e.message }); }
});

// Products CRUD
router.get('/products', adminAuth, async (req,res)=>{
  try{
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  }catch(e){ res.status(500).json({ error: e.message }); }
});

router.post('/products', adminAuth, async (req,res)=>{
  try{
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  }catch(e){ res.status(500).json({ error: e.message }); }
});

router.put('/products/:id', adminAuth, async (req,res)=>{
  try{
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  }catch(e){ res.status(500).json({ error: e.message }); }
});

router.delete('/products/:id', adminAuth, async (req,res)=>{
  try{
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product) return res.status(404).json({ msg: 'Product not found' });
    res.json({ msg: 'Product deleted' });
  }catch(e){ res.status(500).json({ error: e.message }); }
});

// Branches CRUD
router.get('/branches', adminAuth, async (req,res)=>{
  try{
    const branches = await Branch.find().sort({ createdAt: -1 });
    res.json(branches);
  }catch(e){ res.status(500).json({ error: e.message }); }
});

router.post('/branches', adminAuth, async (req,res)=>{
  try{
    const branch = new Branch(req.body);
    await branch.save();
    res.json(branch);
  }catch(e){ res.status(500).json({ error: e.message }); }
});

router.put('/branches/:id', adminAuth, async (req,res)=>{
  try{
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!branch) return res.status(404).json({ msg: 'Branch not found' });
    res.json(branch);
  }catch(e){ res.status(500).json({ error: e.message }); }
});

router.delete('/branches/:id', adminAuth, async (req,res)=>{
  try{
    const branch = await Branch.findByIdAndDelete(req.params.id);
    if(!branch) return res.status(404).json({ msg: 'Branch not found' });
    res.json({ msg: 'Branch deleted' });
  }catch(e){ res.status(500).json({ error: e.message }); }
});

// Contact messages
router.get('/contacts', adminAuth, async (req,res)=>{
  try{
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  }catch(e){ res.status(500).json({ error: e.message }); }
});

router.delete('/contacts/:id', adminAuth, async (req,res)=>{
  try{
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if(!contact) return res.status(404).json({ msg: 'Contact not found' });
    res.json({ msg: 'Contact deleted' });
  }catch(e){ res.status(500).json({ error: e.message }); }
});

module.exports = router;
