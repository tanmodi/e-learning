import tryCatch from "../middlewares/tryCatch.js";
import { course } from "../models/course.js";
import { lecture } from "../models/lecture.js";
import user from "../models/user.js";

export const getAllCourses = tryCatch(async (req, res) => {
    const courses = await course.find();
    res.status(200).json({
        data: courses,
    });
});

export const getSingleCourse = tryCatch(async (req, res) => {
    const singleCourse = await course.findById(req.params.id);

    res.status(200).json({
        data: singleCourse,
    });
});

export const fetchLecture = tryCatch(async (req, res) => {
    const findLecture = await lecture.find({ course: req.params.id });

    const findUser = await user.findById(req.user._id);

    if (findUser.role === "admin") {
        return res.status(200).json({
            data: findLecture,
        });
    }

    if (!findUser.subscription.includes(req.params.id)) {
        return res.status(400).json({
            message: "You need to subscribe to access this course",
        });
    }

    res.status(200).json({
        data: findLecture,
    });
});

export const fetchSingleLecture = tryCatch(async (req, res) => {
    const findSingleLecture = await lecture.findById(req.params.id);

    const findUser = await user.findById(req.user._id);

    if (findUser.role === "admin") {
        return res.status(200).json({
            data: findSingleLecture,
        });
    }

    if (!findUser.subscription.includes(req.params.id)) {
        return res.status(400).json({
            message: "You need to subscribe to access this course",
        });
    }

    res.status(200).json({
        data: findSingleLecture,
    });
});
