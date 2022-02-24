const express = require("express");

const response = require("../network/response");

const store = require("../store/mysql");

const router = express.Router();


const list = async (req, res, next) => {
  await store.list(req.params.table, req.params.id)
  .then(data => {
    response.success(req, res, data, 200)
  })
  .catch(next);
}

const get = async (req, res, next) => {
  await store.get(req.params.table, req.params.id)
  .then(data => {
    response.success(req, res, data, 200)
  })
  .catch(next);
  
 }

const upsert = async (req, res, next) => {
  console.log('llega hasta aca')
  await store.upsert(req.params.table, req.body)
  .then(data => {
    response.success(req, res, data, 200)
  })
  .catch(next);
 }




//routes 
router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', upsert);
router.put('/:table', upsert);

module.exports = router;