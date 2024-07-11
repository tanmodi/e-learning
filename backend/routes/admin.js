import express from "express";
import { createCourse, addLecture } from "../controllers/admin.js";
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

router.post("/course/:id", isAuth, isAdmin, uploadFiles, addLecture);
router.post(
    "/course/:id/2",
    isAuth,
    isAdmin,
    uploadFiles2,
    uploadToCloudinary,
    addLecture
);

export default router;
