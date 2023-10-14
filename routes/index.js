const router = require("express").Router();
const clothingItems = require("./clothingItems");
const users = require("./users");
const { createUser, login } = require("../controllers/users");
const { ERROR_404 } = require("../utils/errors");

const {
  validateUserLogin,
  validateUserInfo,
} = require("../middlewares/validation");

router.use("/items", clothingItems);
router.use("/users", users);
router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserInfo, createUser);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "Router not found index" });
});

module.exports = router;
