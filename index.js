require('dotenv').config();

const scraper = require('./Public/Scraping/scrape');
const apiRoutes = require('./Public/Routes/api');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Routes go here
app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));