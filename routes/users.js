const router = require("express").Router();

const { handleAuthError } = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");

router.get("/me", handleAuthError, getCurrentUser);
router.patch("/me", handleAuthError, updateUser);

module.exports = router;
