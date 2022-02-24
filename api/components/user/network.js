const express = require("express");
const secure = require("./secure");
const response = require("../../../network/response");
const controller = require("./index");

const router = express.Router();

const list = (req, res, next) => {
  controller
    .list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch(next);
};

const get = (req, res, next) => {
  controller
    .get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
};

const upsert = (req, res, next) => {
  controller
    .upsert(req.body)
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch(next);
};

const follow = (req, res, next) => {
  // User que sigue /user que quiere seguir
  controller
    .follow(req.user.id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
};

const followList = (req, res, next) => {
  console.log('lista follows')
  controller
    .followingList(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
};

// All routes
router.get("/:id/following", followList);
router.post("/follow/:id", secure("follow"), follow);
router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.put("/", secure("update"), upsert);

module.exports = router;
