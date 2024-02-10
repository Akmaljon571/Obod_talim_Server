import { Router } from "express";
import { dashboardTeacher, login, loginCode } from "../controller/admin.controller.js";
import { loginAdmin, loginCodeAdmin } from "../validator/admin.validate.js";
import validate from "../middleware/validate.js";
import teacherMiddleware from "../middleware/teacher.middleware.js";

export default Router()
    .post('/login', validate(loginAdmin), login)
    .post('/login/code', validate(loginCodeAdmin), loginCode)
    .get('/teacher', teacherMiddleware, dashboardTeacher)
