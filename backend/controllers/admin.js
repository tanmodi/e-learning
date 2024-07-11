import tryCatch from "../middlewares/tryCatch.js";
import { course } from "../models/course.js";
import { lecture } from "../models/lecture.js";

export const createCourse = tryCatch(async (req, res) => {
    const { title, description, category, createdBy, duration, price } = req.body;
    const image = req.file;

    // Check if image is provided
    if (!image) {
        return res.status(400).json({
            message: "Image is required",
        });
    }

    await course.create({
        title,
        description,
        category,
        createdBy,
        duration,
        price,
        image: image.path || image.fileURL,
    });

    res.status(200).json({
        message: "Course created successfully",
    });
});

export const addLecture = tryCatch(async (req, res) => {
    const findCourse = await course.findById(req.params.id);

    if (!findCourse) {
        return res.status(404).json({
            message: "no course found with this id",
        });
    }
    const { title, description } = req.body;

    const file = req.file;

    const createLecture = await lecture.create({
        title,
        description,
        video: file.path || file.fileURL,
        course: findCourse._id,
    });

    res.status(201).json({
        message: "Lecture added successfully",
        data: createLecture,
    });
});
