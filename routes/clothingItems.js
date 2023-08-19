const router = require("express").Router();

const {
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");

router.get("/items", getClothingItem);

router.post("/items", createClothingItem);

router.delete("/items/:itemId", deleteClothingItem);

module.exports = router;
