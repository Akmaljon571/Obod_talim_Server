import { Router } from "express";
import validate from "../middleware/validate.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import adminOrTeacherMiddleware from "../middleware/adminOrTeacher.middleware.js";
import { studentAll, studentCreate, studentDelete, studentGuruh, studentOne, studentUpdate } from "../controller/student.controller.js";
import { studentCreateJoi, studentUpdateJoi } from "../validator/student.validate.js";
import upload from "../utils/upload.js";

export default Router()
    .get('/all', adminOrTeacherMiddleware, studentAll)
    .get('/guruh/:id', adminOrTeacherMiddleware, studentGuruh)
    .get('/one/:id', adminOrTeacherMiddleware, studentOne)
    .post('/create', adminOrTeacherMiddleware, upload.single('image'), validate(studentCreateJoi), studentCreate)
    .patch('/update/:id', adminOrTeacherMiddleware, upload.single('image'), validate(studentUpdateJoi), studentUpdate)
    .delete('/delete/:id', adminMiddleware, studentDelete)
