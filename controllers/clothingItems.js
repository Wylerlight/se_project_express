const ClothingItem = require("../models/clothingItem");
const { handleErrors } = require("../utils/errors");

module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};
module.exports.getClothingItem = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.send({ data: items });
    })
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};
module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  console.log(req.user._id);

  ClothingItem.findOne({ itemId }).then((item) => {
    console.log(item);
  });

  if (req.user._id !== req.owner) {
    res.status(403).send({ message: "Forbidden" });
  } else {
    ClothingItem.findByIdAndDelete(req.params.itemId)
      .orFail()
      .then((item) => res.send({ data: item }))
      .catch((e) => {
        console.error(e);
        handleErrors(req, res, e);
      });
  }
};
