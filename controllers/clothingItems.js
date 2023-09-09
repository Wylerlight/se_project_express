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

  ClothingItem.findById(itemId)
    .then((item) => {
      const itemOwner = item.owner.toString();

      if (req.user._id !== itemOwner) {
        res.status(403).send({ message: "Forbidden" });
      } else {
        ClothingItem.findByIdAndDelete(itemId)
          .orFail()
          .then((itemRes) => {
            res.send({ data: itemRes });
          })
          .catch((e) => {
            console.error(e);
            handleErrors(req, res, e);
          });
      }
    })
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};
