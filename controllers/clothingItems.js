const ClothingItem = require("../models/clothingItem");
const { handleErrors } = require("../utils/errors");

module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  console.log(req.user._id);

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
      // res.status(500).send({ message: "Error from create clothing" });
    });
};
module.exports.getClothingItem = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send({ data: items });
    })
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
      // res.status(500).send({ message: "Error from get clothing" });
    });
};
module.exports.deleteClothingItem = (req, res) => {
  ClothingItem.findById(req.params.id)
    // .orFail()
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
      // res.status(500).send({ message: "Error from delete clothing" });
    });
};
