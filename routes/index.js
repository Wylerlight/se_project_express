const router = require("express").Router();
const clothingItems = require("./clothingItems");
const users = require("./users");
const { createUser, login } = require("../controllers/users");

const {
  validateUserLogin,
  validateUserInfo,
} = require("../middlewares/validation");
const NotFoundError = require("../errors/NotFoundError");

router.use("/items", clothingItems);
router.use("/users", users);
router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserInfo, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;
