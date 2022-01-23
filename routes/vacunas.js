const router = require("express").Router();
const authToken = require("../middleware/validate-token");
const { createVacine, getVacunas } = require("../controllers/vacuna");

router.post("/vacine", authToken, createVacine);

router.post("/vacines", authToken, getVacunas);

module.exports = router;
