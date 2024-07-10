import tryCatch from "../middlewares/tryCatch.js";
import { course } from "../models/course.js";

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
