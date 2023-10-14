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

router.delete("/:id", handleAuthError, deleteClothingItem);

router.put("/:id/likes", handleAuthError, likeItem);
router.delete("/:id/likes", handleAuthError, dislikeItem);

module.exports = router;
