const router = require("express").Router();

const {
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");
const { likeItem, dislikeItem } = require("../controllers/likes");
const { handleAuthError } = require("../middlewares/auth");

const {
  validateClothingItem,
  validateIds,
} = require("../middlewares/validation");

router.get("/", getClothingItem);

router.post("/", handleAuthError, validateClothingItem, createClothingItem);

router.delete("/:id", handleAuthError, validateIds, deleteClothingItem);

router.put("/:id/likes", handleAuthError, validateIds, likeItem);
router.delete("/:id/likes", handleAuthError, validateIds, dislikeItem);

module.exports = router;
