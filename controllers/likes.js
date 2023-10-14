const ClothingItem = require("../models/clothingItem");
const { handleErrors } = require("../utils/errors");

module.exports.likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });

module.exports.dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
