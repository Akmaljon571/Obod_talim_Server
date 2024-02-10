import { Router } from "express";
import validate from "../middleware/validate.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import teacherMiddleware from "../middleware/adminOrTeacher.middleware.js";
import { teacherAll, teacherCreate, teacherDelete, teacherUpdate, findOne } from "../controller/teacher.controlller.js";
import { teacherCreateJoi, teacherUpdateJoi } from "../validator/teacher.validate.js";
import upload from "../utils/upload.js";

export default Router()
    .get('/all', teacherMiddleware, teacherAll)
    .get('/one/:id', teacherMiddleware, findOne)
    .post('/create', adminMiddleware, upload.single('image'), validate(teacherCreateJoi), teacherCreate)
    .patch('/update/:id', adminMiddleware, upload.single('image'), validate(teacherUpdateJoi), teacherUpdate)
    .delete('/delete/:id', adminMiddleware, teacherDelete)
  