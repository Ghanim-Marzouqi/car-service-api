const express = require("express");
const controller = require("../controllers/general-controller");

const router = express.Router();

router.get("/statistics", controller.getStatistics);

module.exports = router;