
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3500;

// create server by express.js
const app = express();

app.listen(PORT, () => {
	console.info(`this server is listening on port of ${PORT}`)
});
