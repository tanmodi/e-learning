import tryCatch from "../middlewares/tryCatch";

export const createCourse = tryCatch(async (req, res) => {
    const { title, description, category, createdBy, duration, price } = req.body;
    
});