import Joi from "joi";
export default {
  validateScheam(body) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    });
    const { error, value } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  }
};
