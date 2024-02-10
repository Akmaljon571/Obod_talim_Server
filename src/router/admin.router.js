import { Router } from "express";
import { dashboardAdmin, dashboardTeacher, login, loginCode } from "../controller/admin.controller.js";
import { loginAdmin, loginCodeAdmin } from "../validator/admin.validate.js";
import validate from "../middleware/validate.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import teacherMiddleware from "../middleware/teacher.middleware.js";

export default Router()
    .post('/login', validate(loginAdmin), login)
    .post('/login/code', validate(loginCodeAdmin), loginCode)
    .get('/dashboard', adminMiddleware, dashboardAdmin)
    .get('/dashboard/teacher', teacherMiddleware, dashboardTeacher)