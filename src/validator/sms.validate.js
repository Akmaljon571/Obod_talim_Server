import Joi from "joi";

export const smsCreateJoi = Joi.object({
    desc: Joi.string().required(),
    send_id: Joi.string().required(),
    status: Joi.valid('teacher', 'student').required(),
}).required();
