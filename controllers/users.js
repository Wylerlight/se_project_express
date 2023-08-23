const User = require("../models/user");
const { handleErrors } = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send({ message: "Error at find all users" });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};
