const ClothingItem = require("../models/clothingItem");
const ForbiddenError = require("../errors/ForbiddenError");
const BadRequestError = require("../errors/BadRequestError");

module.exports.createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(e);
      }
    });
};
module.exports.getClothingItem = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => {
      res.send({ data: items });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(e);
      }
    });
};

module.exports.deleteClothingItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findById(id)
    .orFail()
    .then((item) => {
      const itemOwner = item.owner.toString();

      if (req.user._id !== itemOwner) {
        next(new ForbiddenError("Forbidden"));
      } else {
        ClothingItem.findByIdAndDelete(id)
          .orFail()
          .then((itemRes) => {
            res.send({ data: itemRes });
          })
          .catch((e) => {
            if (e.name === "ValidationError") {
              next(new BadRequestError("Invalid data"));
            } else {
              next(e);
            }
          });
      }
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(e);
      }
    });
};
