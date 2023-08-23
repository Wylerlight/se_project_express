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
  console.log("////////////////////////////////////////////////////////");
  console.log(req);
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send({ data: items });
    })
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};
module.exports.deleteClothingItem = (req, res) => {
  console.log(req.params.itemId);
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};
