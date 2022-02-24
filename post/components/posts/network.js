const express = require("express");
const response = require("../../../network/response");
const controller = require("./index");

const router = express.Router();

const list = (req, res, next) => {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
};

const get = (req, res, next) => {
  controller
    .get(req.params.id)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
};

const upsert = (req, res, next) => {
  controller
    .upsert(req.body)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
};

router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.put("/", upsert);

module.exports = router;
