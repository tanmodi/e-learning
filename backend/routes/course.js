import express from "express";
import {
    getAllCourses,
    getSingleCourse,
    fetchLecture,
    fetchSingleLecture,
} from "../controllers/course.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLecture);
router.get("/lecture/:id", isAuth, fetchSingleLecture);

export default router;
