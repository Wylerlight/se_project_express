const router = require("express").Router();

const {
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");
const { likeItem, dislikeItem } = require("../controllers/likes");
const { handleAuthError } = require("../middlewares/auth");

router.get("/", getClothingItem);

router.post("/", handleAuthError, createClothingItem);

router.delete("/:itemId", handleAuthError, deleteClothingItem);

router.put("/:itemId/likes", handleAuthError, likeItem);
router.delete("/:itemId/likes", handleAuthError, dislikeItem);

module.exports = router;
