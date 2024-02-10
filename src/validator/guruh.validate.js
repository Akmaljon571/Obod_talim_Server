import Joi from "joi";

export const guruhCreateJoi = Joi.object({
    title: Joi.string().required(),
    sequence: Joi.string().required(),
    kun: Joi.string().required(),
    soat: Joi.string().required(),
    teacher_id: Joi.string().required(),
}).required();

export const guruhUpdateJoi = Joi.object({
    title: Joi.string(),
    sequence: Joi.string(),
    kun: Joi.string(),
    soat: Joi.string(),
    teacher_id: Joi.string(),
}).required();
