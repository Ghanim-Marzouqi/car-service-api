const express = require("express");
const controller = require("../controllers/general-controller");

const router = express.Router();

router.get("/statistics", controller.getStatistics);
router.get("/regions", controller.getRegions);
router.get("/willayats/:id", controller.getWillayats);
router.post("/send-email", controller.sendEmailNotification);

module.exports = router;