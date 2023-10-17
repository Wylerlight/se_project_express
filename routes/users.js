const router = require("express").Router();

const { handleAuthError } = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateAvatar } = require("../middlewares/validation");

router.get("/me", handleAuthError, getCurrentUser);
router.patch("/me", handleAuthError, validateAvatar, updateUser);

module.exports = router;
