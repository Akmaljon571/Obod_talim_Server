import { Router } from "express";
import { yonalishCreateJoi, yonalishUpdateJoi } from "../validator/yonalish.validate.js";
import { yonalishCreate, yonalishDelete, yonalishGet, yonalishUpdate } from "../controller/yonalish.controller.js";
import validate from "../middleware/validate.js";
import adminMiddleware from "../middleware/admin.middleware.js";

export default Router()
    .get('/all', yonalishGet)
    .post('/create', adminMiddleware, validate(yonalishCreateJoi), yonalishCreate)
    .put('/update/:id', adminMiddleware, validate(yonalishUpdateJoi), yonalishUpdate)
    .delete('/delete/:id', adminMiddleware, yonalishDelete)
