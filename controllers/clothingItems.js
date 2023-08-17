const Item = require("../models/clothingItem");

module.exports.createItem = (req, res) => {
  const { itemName, weatherType, imageUrl } = req.body;

  Item.create({ itemName, weatherType, imageUrl, owner: req.user._id })
    .then((item) => res.send({ data: item }))
    .catch(() => res.status(500).send({ message: "Error" }));
};
module.exports.getItem = (req, res) => {
  Item.find({})
    .then((items) => {
      res.status(200).send({ data: items });
    })
    .catch(() => res.status(500).send({ message: "Error" }));
};
module.exports.deleteItem = (req, res) => {
  Item.findById(req.params.id)
    .then((item) => res.send({ data: item }))
    .catch(() => res.status(500).send({ message: "Error" }));
};
