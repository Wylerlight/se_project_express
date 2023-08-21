const router = require("express").Router();

const {
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");
const { likeItem, dislikeItem } = require("../controllers/likes");

router.get("/", getClothingItem);

router.post("/", createClothingItem);

router.delete("/:itemId", deleteClothingItem);

router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
