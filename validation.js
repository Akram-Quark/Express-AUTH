const joi = require("@hapi/joi");
//*registration validation 👍

function register_Validation(body) {
  const val_schema = joi.object({
    name: joi.string().min(6).required(),
    email: joi.string().min(6).email().required(),
    password: joi.string().min(6).required(),
  });
  const validation = val_schema.validate(body);
  return validation;
}

//*login validation 🔒

function login_Validation(body) {
  const val_schema = joi.object({
    email: joi.string().min(6).email().required(),
    password: joi.string().min(6).required(),
  });
  const validation = val_schema.validate(body);
  return validation;
}

module.exports = { register_Validation, login_Validation };
