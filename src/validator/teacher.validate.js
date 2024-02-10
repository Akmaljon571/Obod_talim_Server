import Joi from "joi";

export const teacherCreateJoi = Joi.object({
    username: Joi.string().required(),
    familiya: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    kocha: Joi.string().required(),
    uy: Joi.string().required(),
    jsh: Joi.string().required(),
    tugilgan_sana: Joi.string().required(),
    otasini_ismi: Joi.string().required(),
    yonalish_id: Joi.string().required(),
    jinsi: Joi.boolean().required(),
    raqam: Joi.number().required(),
    izoh: Joi.string().required(),
}).required();

export const teacherUpdateJoi = Joi.object({
    username: Joi.string(),
    familiya: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    kocha: Joi.string(),
    uy: Joi.string(),
    jsh: Joi.string(),
    tugilgan_sana: Joi.string(),
    otasini_ismi: Joi.string(),
    yonalish_id: Joi.string(),
    jinsi: Joi.boolean(),
    raqam: Joi.number(),
    izoh: Joi.string(),
}).required();
