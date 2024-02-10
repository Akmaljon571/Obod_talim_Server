import { Router } from "express";
import validate from "../middleware/validate.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import teacherMiddleware from "../middleware/teacher.middleware.js";
import { smsCreateJoi } from "../validator/sms.validate.js";
import { smsCreate, smsTeacher } from "../controller/sms.controller.js";

export default Router()
    .get('/one', teacherMiddleware, smsTeacher)
    .post('/send', adminMiddleware, validate(smsCreateJoi), smsCreate)
