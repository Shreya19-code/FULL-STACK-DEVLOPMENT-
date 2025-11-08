const User = require('../models/User');
const jwt = require('jsonwebtoken');

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User exists' });
    const user = await User.create({ username, email, password });
    res.json({ token: genToken(user._id), user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await user.matchPassword(password);
    if(!ok) return res.status(400).json({ message: 'Invalid credentials' });
    res.json({ token: genToken(user._id), user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).populate('favorites');
  if(!user) return res.status(404).json({ message: 'User not found' });
  res.json({ id: user._id, username: user.username, email: user.email, favorites: user.favorites });
};

exports.addFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);
  if(!user) return res.status(404).json({ message: 'User not found' });
  const qid = req.params.id;
  if(user.favorites.includes(qid)) return res.status(400).json({ message: 'Already saved' });
  user.favorites.push(qid);
  await user.save();
  res.json({ message: 'Saved' });
};

exports.removeFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);
  if(!user) return res.status(404).json({ message: 'User not found' });
  user.favorites = user.favorites.filter(x=>x.toString()!==req.params.id);
  await user.save();
  res.json({ message: 'Removed' });
};
