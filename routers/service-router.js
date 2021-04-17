const express = require("express");
const controller = require("../controllers/service-controller");

const router = express.Router();

router.post("/service", controller.createService);
router.put("/service/:id", controller.updateService);
router.delete("/service/:id", controller.deleteService);
router.get("/service/:id", controller.getServiceById);
router.get("/services", controller.getAllServices);

module.exports = router;