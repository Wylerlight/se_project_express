const { Joi, celebrate } = require("celebrate");
const { isValidObjectId } = require("mongoose");
const validator = require("validator");

// Validation for URL and item images
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.url");
};

/* -------------------------------------------------------------------------- */
/*                             Clothing Validation                            */
/* -------------------------------------------------------------------------- */
const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

/* -------------------------------------------------------------------------- */
/*                            User Info Validation                            */
/* -------------------------------------------------------------------------- */
const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'the "avatar" field must be a valid url',
    }),
    email: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "email" field must be filled in',
      "string.uri": 'the "email" field must be a valid url',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

/* -------------------------------------------------------------------------- */
/*                            User Login Validation                           */
/* -------------------------------------------------------------------------- */
const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "email" field must be filled in',
      "string.uri": 'the "email" field must be a valid url',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

/* -------------------------------------------------------------------------- */
/*                                ID Validation                               */
/* -------------------------------------------------------------------------- */

function isValidId(value, helpers) {
  if (isValidObjectId(value)) {
    return value;
  }
  return helpers.error("Invalid Id");
}

const validateIds = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required().custom(isValidId).messages({
      "string.empty": "The id is missing",
      "string.hex":
        "The id must be a hexadecimal with a length of 24 characters",
    }),
  }),
});

module.exports = {
  validateClothingItem,
  validateUserInfo,
  validateUserLogin,
  validateIds,
};
