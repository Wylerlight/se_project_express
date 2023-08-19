const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => res.status(500).send({ message: "Error" }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: "Error" }));
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  console.log();

  User.create({ name, avatar })
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      console.error(e);
      res.status(500).send({ message: "Error" });
    });
};