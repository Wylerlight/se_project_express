const router = require("express").Router();
const clothingItems = require("./clothingItems");
const users = require("./users");
const { createUser, login } = require("../controllers/users");
const { ERROR_404 } = require("../utils/errors");

router.use("/items", clothingItems);
router.use("/users", users);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "Router not found index" });
});

module.exports = router;

/*

validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email",
    },
 */
