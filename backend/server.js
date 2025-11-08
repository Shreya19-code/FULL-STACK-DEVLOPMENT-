const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

// routes
const quoteRoutes = require("./routes/quoteRoutes");
app.use("/api/quotes", quoteRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
