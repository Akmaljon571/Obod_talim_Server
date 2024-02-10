import { Router } from "express";
import adminRouter from "./admin.router.js";
import yonalishRouter from "./yonalish.router.js";
import teacherRouter from "./teacher.router.js";
import smsRouter from "./sms.router.js";
import guruhRouter from "./guruh.router.js";
import studentRouter from "./student.router.js";

export default Router()
    .use('/admin', adminRouter)
    .use('/yonalish', yonalishRouter)
    .use('/teacher', teacherRouter)
    .use('/student', studentRouter)
    .use('/guruh', guruhRouter)
    .use('/sms', smsRouter)
