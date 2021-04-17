const express = require("express");
const controller = require("../controllers/user-controller");

const router = express.Router();

router.post("/user", controller.createUser);
router.put("/user/:id", controller.updateUser);
router.delete("/user/:id", controller.deleteUser);
router.get("/user/:id", controller.getUserById);
router.get("/users", controller.getAllUsers);

module.exports = router;