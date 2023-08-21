const ClothingItem = require("../models/clothingItem");

module.exports.createClothingItem = (req, res) => {
  const { itemName, weatherType, imageUrl } = req.body;
  console.log(req.user._id);
  ClothingItem.create({ itemName, weatherType, imageUrl, owner: req.user._id })
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      console.error(e);
      res.status(500).send({ message: "Error" });
    });
};
module.exports.getClothingItem = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send({ data: items });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send({ message: "Error" });
    });
};
module.exports.deleteClothingItem = (req, res) => {
  ClothingItem.findById(req.params.id)
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      console.error(e);
      res.status(500).send({ message: "Error" });
    });
};
