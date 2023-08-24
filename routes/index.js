const router = require("express").Router();
const clothingItems = require("./clothingItems");
const userRouter = require("./users");
const { ERROR_404 } = require("../utils/errors");

router.use("/items", clothingItems);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "Router not found" });
});

module.exports = router;
