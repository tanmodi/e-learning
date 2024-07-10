import multer from "multer";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import { v4 as uuid } from "uuid";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const id = uuid();
        const extName = file.originalname.split(".").pop();

        const fileName = `${id}.${extName}`;
        cb(null, fileName);
    },
});

export const uploadFiles = multer({ storage }).single("file");

const storage2 = multer.memoryStorage();

export const uploadFiles2 = multer({ storage2 }).single("file");

// Ensure uploadToCloudinary is properly set up as middleware
export const uploadToCloudinary = (req, res, next) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileStream = cloudinary.v2.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
            return res.status(500).send('Failed to upload to Cloudinary.');
        }
        console.log(result);

        // Attach the URL of the uploaded image to the request so it can be used by subsequent middleware
        req.file.path  = result.url;
        console.log(req.file.path );
        // Proceed to the next middleware
        next();
    });

    fileStream.end(req.file.buffer);
};


