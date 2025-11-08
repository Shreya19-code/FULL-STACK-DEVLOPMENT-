const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const Quote = require('./models/Quote');

const QUOTES = [
  {text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt", tags:["inspiration","future"]},
  {text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis", tags:["motivation","dreams"]},
  {text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", tags:["belief","confidence"]},
  {text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe", tags:["action","practical"]}
];

const seed = async () => {
  await connectDB();
  await Quote.deleteMany({});
  await Quote.insertMany(QUOTES);
  console.log('Seeded');
  process.exit();
};

seed();
