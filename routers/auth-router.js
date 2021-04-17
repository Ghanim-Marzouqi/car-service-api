const express = require("express");
const controller = require("../controllers/auth-controller");

const router = express.Router();

router.post("/login", controller.authenticateUser);
router.post("/register", controller.createUser);
router.put("/update-profile/:id", controller.updateUserProfile);
router.get("/get-user-profile/:id", controller.getUserProfile);
router.put("/change-password/:id", controller.changePassword);
router.get("/get-user-garages/:id", controller.getUserGarages);

module.exports = router;