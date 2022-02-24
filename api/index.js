const express = require('express');
const bodyParser = require('body-parser');

const configFile = require('../config');
const auth = require('./components/auth/network');
const user = require('./components/user/network');
const errors = require('../network/errors');


const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');


const app = express();

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Router 
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//Es importante que sea el ultimo
app.use(errors);

app.listen(configFile.api.port, () => {
  console.log('Api corriendo en el port', configFile.api.port)
})