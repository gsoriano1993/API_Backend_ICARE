const router = require("express").Router();
const {
  login,
  register,
  forgotPassword,
  resetPassword,
  users,
  authUser,
  user
} = require("../controllers/auth");
const authToken = require("../middleware/validate-token");
const { passwordResetValidator } = require("../middleware/validator");

// LOGIN
router.post("/login", login);

// REGISTER
router.post("/register", register);

// FORGOT
router.put("/forgot", forgotPassword);

// RESET
router.put("/reset", passwordResetValidator, resetPassword);

// USERS
router.get("/users", users);

// USER WITH TOKEN
// Endpoint a probar
router.get("/auth-user", authToken, authUser);

// USER
router.get("/:id", user);

module.exports = router;
