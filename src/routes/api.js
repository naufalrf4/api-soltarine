const express = require("express");
const router = express.Router();

const dataController = require("../controllers/dataController");
const deleteController = require("../controllers/deleteController");
const authenticateToken = require("../middlewares/authenticationMiddleware");
const apiLimiter = require("../middlewares/rateLimitMiddleware");

router.get("/data", apiLimiter, authenticateToken, dataController.getData);
router.put("/data", apiLimiter, authenticateToken, dataController.updateData);

router.post("/deleteOldData", deleteController.deleteOldData);

module.exports = router;
