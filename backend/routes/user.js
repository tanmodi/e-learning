import express from "express";
import { loginUser, myProfile, register, verifyUser } from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get('/user/register', (req, res) => {
    res.send('Not valid route for registration. Please use POST method.');
    });

router.post('/user/register', register);
router.post('/user/verify', verifyUser);
router.post('/user/login', loginUser);
router.get("/user/me", isAuth, myProfile);

export default router;