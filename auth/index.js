const jwt = require('jsonwebtoken');
const config = require('../config')
const secret = config.jwt.secret;
const error = require('../utils/error')


const signToken = (data) => {
  return jwt.sign(data, secret)
}

const checkAuth = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);
    if(decoded.id !== owner){
      throw error('No posees permisos para hacer esto', 401);
    }
  }, 
  logged: (req) => {
    const decoded = decodeHeader(req);
  }, 
  
}

const verifyToken = (token) => {
  return jwt.verify(token, secret)
}

const getToken = (auth) => {
  // Bearer kljsdhkjfklasjhdf
  if(!auth){
    throw error('No viene token', 403);
  }
  // asegurar que el formato del token sea correcto 
  if(auth.indexOf('Bearer ') === -1) {
    throw error('Token invalido', 400);
  }
  let token = auth.replace('Bearer ', '');
  return token
}

const decodeHeader = req => {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verifyToken(token);

  req.user = decoded; 

  return decoded
}

module.exports = {
  signToken, 
  checkAuth
}
