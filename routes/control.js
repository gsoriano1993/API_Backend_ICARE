const router = require("express").Router();
const { createControl, getControls } = require("../controllers/control");
const authToken = require("../middleware/validate-token");
 
router.post("/control", authToken, createControl);

router.post("/controls", authToken, getControls);

module.exports = router;