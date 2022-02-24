// Exporta un middleware
const auth = require('../../../auth')
module.exports = function checkAuth(action) {
  const middleware = (req, res, next) =>{
    switch(action){
      case 'update':
        const owner = req.body.id;
        auth.checkAuth.own(req, owner);
        next();
        break;
      case 'follow':
        auth.checkAuth.logged(req);
        next();
        break;
      
      default:
        next();
    }
  }
  return middleware;
}