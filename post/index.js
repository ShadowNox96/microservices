const express = require('express');
const bodyParser = require('body-parser');

const configFile = require('../config');
const post = require('./components/posts/network');
const errors = require('../network/errors');




const app = express();

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Router 
app.use('/api/post', post)


//Es importante que sea el ultimo
app.use(errors);

app.listen(configFile.post.port, () => {
  console.log('Servicio Post corriendo en el port', configFile.post.port)
})