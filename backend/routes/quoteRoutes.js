const express = require("express");
const router = express.Router();
const Quote = require("../models/Quote");

// Get all quotes
router.get("/", async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
