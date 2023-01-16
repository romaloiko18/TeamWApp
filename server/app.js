require('dotenv').config();
require('./db');

const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Server is running', PORT));