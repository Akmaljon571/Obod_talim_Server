import Joi from "joi";

export const studentCreateJoi = Joi.object({
    username: Joi.string().required(),
    familiya: Joi.string().required(),
    email: Joi.string().required(),
    kocha: Joi.string().required(),
    uy: Joi.string().required(),
    jsh: Joi.string().required(),
    tugilgan_sana: Joi.string().required(),
    otasini_ismi: Joi.string().required(),
    jinsi: Joi.boolean().required(),
    raqam: Joi.string().required(),
    guruh_id: Joi.string().required(),
    holati: Joi.valid('oqimoqda', 'ketgan', 'tamomladi').required(),
}).required();


export const studentUpdateJoi = Joi.object({
    username: Joi.string(),
    familiya: Joi.string(),
    email: Joi.string(),
    kocha: Joi.string(),
    uy: Joi.string(),
    jsh: Joi.string(),
    tugilgan_sana: Joi.string(),
    otasini_ismi: Joi.string(),
    jinsi: Joi.boolean(),
    raqam: Joi.string(),
    guruh_id: Joi.string(),
    holati: Joi.valid('oqimoqda', 'ketgan', 'tamomladi'),
}).required();

