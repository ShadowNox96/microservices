const config = require('../../../config');
const store = require('../../../store/remote-mysql');
const cache = require('../../../store/remote-cache');

const controller = require('./controller');


module.exports = controller(store, cache);