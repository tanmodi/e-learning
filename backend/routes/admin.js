import express from "express";
import { createCourse } from "../controllers/admin.js";
import { isAuth, isAdmin } from "../middlewares/isAuth.js";
import {
    uploadFiles,
    uploadToCloudinary,
    uploadFiles2,
} from "../middlewares/multer.js";

const router = express.Router();

router.post("/course/new", isAuth, isAdmin, uploadFiles, createCourse);
router.post(
    "/course/new2",
    isAuth,
    isAdmin,
    uploadFiles2,
    uploadToCloudinary,
    createCourse
);

export default router;
