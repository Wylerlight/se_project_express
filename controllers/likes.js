const NotFoundError = require("../errors/NotFoundError");
const ClothingItem = require("../models/clothingItem");

module.exports.likeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("Likes not found"))
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      next(e);
    });

module.exports.dislikeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("Likes not found"))
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      next(e);
    });
