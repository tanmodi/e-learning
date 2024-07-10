import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/sendMail.js";
import tryCatch from "../middlewares/tryCatch.js";

export const register = tryCatch(async (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json({
            error: "All fields are required",
        });
    }
    let finduser = await user.findOne({
        email,
    });
    if (finduser) {
        return res.status(400).json({
            error: "User already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    let newUser = {
        email,
        name,
        password: hashedPassword,
    };

    const otp = Math.floor(100000 + Math.random() * 900000);

    const activationToken = jwt.sign(
        {
            newUser,
            otp,
        },
        process.env.activation_token_secret,
        {
            expiresIn: "20m",
        }
    );

    const data = {
        name,
        otp,
    };

    await sendMail(email, "Account Activation", data);
    res.status(200).json({
        message: "Please check your email for the OTP",
        activationToken,
    });
});
export const verifyUser = tryCatch(async (req, res) => {
    const { otp, activation_token } = req.body;

    const verify = jwt.verify(
        activation_token,
        process.env.activation_token_secret
    );
    if (!verify) {
        return res.status(400).json({
            error: "OTP Expired",
        });
    }
    if (verify.otp !== otp) {
        return res.status(400).json({
            error: "Incorrect OTP",
        });
    }
    try {
        await user.create({
            email: verify.newUser.email,
            name: verify.newUser.name,
            password: verify.newUser.password,
        });
        res.status(200).json({
            message: "User registered successfully",
        });
    } catch (error) {
        if (error.name === "MongoServerError" && error.code === 11000) {
            return res.status(400).json({
                error: "User already registered",
            });
        }

        throw error;
    }
});

export const loginUser = tryCatch(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: "All fields are required",
        });
    }
    let findUser = await user.findOne({
        email,
    });
    if (!findUser) {
        return res.status(400).json({
            error: "User not found",
        });
    }
    const match = await bcrypt.compare(password, findUser.password);
    if (!match) {
        return res.status(400).json({
            error: "Invalid credentials",
        });
    }
    const token = jwt.sign(
        {
            _id: findUser._id,
        },
        process.env.jwt_secret,
        {
            expiresIn: "10d",
        }
    );
    res.status(200).json({
        message: "Login successful",
        token,
        findUser,
    });
});

export const myProfile = tryCatch(async (req, res) => {
    const currentUser = await user.findById(req.user._id);
    res.status(200).json({
        currentUser,
    });
});
