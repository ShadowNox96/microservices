const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const router = require('./network');

const app = express();
app.use(bodyParser.json());
app.use('/', router );

// Routes


app.listen(config.cacheService.port, () => {
  console.log('Redis DB listening on port',config.cacheService.port)
})