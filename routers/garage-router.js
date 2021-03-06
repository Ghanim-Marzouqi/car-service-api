const express = require("express");
const controller = require("../controllers/garage-controller");

const router = express.Router();

router.post("/garage", controller.createGarage);
router.put("/garage/:id", controller.updateGarage);
router.delete("/garage/:id", controller.deleteGarage);
router.get("/garage/:id", controller.getGarageById);
router.get("/garages", controller.getAllGarages);
router.post("/garages", controller.getAllGaragesByRegionIdAndWillayatId);
router.get("/garage-owners", controller.getGarageOwners);
router.get("/garage-details/:id", controller.getFullGarageDetails);
router.get("/owner-garages/:owner_id", controller.getOwnerGarages);

module.exports = router;