const router = require("express").Router();
const authToken = require("../middleware/validate-token");
const { createPercent, getPercent } = require("../controllers/percent");

router.post("/percent", authToken, createPercent);

router.post("/percentiles", authToken, getPercent);

module.exports = router;