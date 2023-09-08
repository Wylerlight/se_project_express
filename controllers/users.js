const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const { handleErrors } = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
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
  const { email, password, name, avatar } = req.body;

  User.findOne({ email }).then((userFound) => {
    console.log(userFound);
    if (userFound) {
      res.status(409).send({ message: "User already exists" });
    }
  });

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({ name, avatar, email, password: hash });
    })
    .then((user) => {
      res.send({ name, avatar, email, _id: user._id });
    })
    .catch((err) => {
      console.error(err);
      handleErrors(req, res, err);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  // const { _id: userId } = req.user;
  console.log(req);

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(res.status(404).send({ message: "User not found" }));
      }
      return next(res.send(user));
    })
    .catch((err) => {
      handleErrors(req, res, err);
    });
};

module.exports.updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      handleErrors(req, res, err);
    });
};
