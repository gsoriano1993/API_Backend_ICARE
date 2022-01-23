const router = require("express").Router();
const authToken = require("../middleware/validate-token");
const { createNinio, getNinios } = require("../controllers/ninio");

router.post("/register", authToken, createNinio);

router.get("/ninios", authToken, getNinios);

module.exports = router;
