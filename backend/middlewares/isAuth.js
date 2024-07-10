import jwt from "jsonwebtoken";
import user from "../models/user.js";

export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(400).json({
                error: "Please login first to access the resource",
            });
        }
        const decodedData = jwt.verify(token, process.env.jwt_secret);
        console.log(decodedData);
        const foundUser = await user.findById(decodedData._id);
        console.log(foundUser);
        if (!foundUser) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = foundUser;
        console.log(req.user);
        next();
    } catch (error) {
        return res.status(500).json({ error: "An error occurred during authentication" });
    }
};