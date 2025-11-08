const Quote = require('../models/Quote');

exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({createdAt:-1});
    res.json(quotes);
  } catch (err) { res.status(500).json({message: err.message}); }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const rand = Math.floor(Math.random()*count);
    const q = await Quote.findOne().skip(rand);
    res.json(q);
  } catch (err) { res.status(500).json({message: err.message}); }
};

exports.addQuote = async (req, res) => {
  try {
    const { text, author, tags } = req.body;
    const q = await Quote.create({ text, author, tags });
    res.status(201).json(q);
  } catch (err) { res.status(400).json({message: err.message}); }
};
