import { Router } from "express";
import validate from "../middleware/validate.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import { teacherAll, teacherCreate, teacherDelete, teacherUpdate, teacherToken, findOne } from "../controller/teacher.controlller.js";
import { teacherCreateJoi, teacherUpdateJoi } from "../validator/teacher.validate.js";
import upload from "../utils/upload.js";
import teacherMiddleware from "../middleware/teacher.middleware.js";

export default Router()
    .get('/all', adminMiddleware, teacherAll)
    .get('/one/:id', adminMiddleware, findOne)
    .get('/one', teacherMiddleware, teacherToken) 
    .post('/create', adminMiddleware, upload.single('image'), validate(teacherCreateJoi), teacherCreate)
    .patch('/update/:id', adminMiddleware, upload.single('image'), validate(teacherUpdateJoi), teacherUpdate)
    .delete('/delete/:id', adminMiddleware, teacherDelete)
