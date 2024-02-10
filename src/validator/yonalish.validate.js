import Joi from "joi";

export const yonalishCreateJoi = Joi.object({
    title: Joi.string().required(),
}).required();

export const yonalishUpdateJoi = Joi.object({
    title: Joi.string(),
}).required();
