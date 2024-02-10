import { Router } from "express";
import validate from "../middleware/validate.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import { guruhAll, guruhCreate, guruhDelete, guruhTeacher, guruhUpdate,findOne } from "../controller/guruh.controller.js";
import adminOrTeacherMiddleware from "../middleware/adminOrTeacher.middleware.js";
import { guruhCreateJoi, guruhUpdateJoi } from "../validator/guruh.validate.js";

export default Router()
    .get('/all', adminMiddleware, guruhAll)
    .get('/one/:id', adminMiddleware, findOne)
    .get('/teacher/:teacher_id', adminOrTeacherMiddleware, guruhTeacher)
    .post('/create', adminMiddleware, validate(guruhCreateJoi), guruhCreate)
    .patch('/update/:id', adminMiddleware, validate(guruhUpdateJoi), guruhUpdate)
    .delete('/delete/:id', adminMiddleware, guruhDelete)
