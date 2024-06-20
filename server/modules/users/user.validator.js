const Joi = require("joi");

// schema define

const userSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "np"] },
    })
    .required(),
  password: Joi.string().required(),
  roles: Joi.array().items(Joi.string().valid("admin", "user")),
  image: Joi.string(),
  isEmailVerified: Joi.boolean(),
  isActive: Joi.boolean(),
});

// mw define
const validator = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { validator };
