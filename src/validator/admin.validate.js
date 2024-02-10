import Joi from "joi";

export const loginAdmin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).required();

export const loginCodeAdmin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    code: Joi.string().required(),
    status: Joi.valid('admin', 'teacher').required(),
}).required();
