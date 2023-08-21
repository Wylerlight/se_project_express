const router = require("express").Router();
const clothingItems = require("./clothingItems");

router.use("/items", clothingItems);
