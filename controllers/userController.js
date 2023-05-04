import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Users from "../models/userModel.js";

import { ResponseError } from "../class/ResponseError.js";
import { config } from "../config.js";

const createAccessToken = (user) => {
    return jwt.sign(user, config.accessSecret, { expiresIn: "4h" }); 
};

const userCtrl = {
    register: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;

            const checkUser = await Users.findOne({ email });

            if (checkUser) {
                return next(new ResponseError(400, "This email address is already been used"));
            }
            if (password.length < 6) {
                return next(new ResponseError(400, "Password must be at least 6 characters"));
            }

            // Encrypt the password
            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = new Users({ name, email, password: passwordHash });

            // Save to database
            const result = await newUser.save();

            // Create token
            const accessToken = createAccessToken({ id: newUser._id });

            return res.json({
                user: result,
                accessToken,
            });
        } catch (error) {
            console.log(error);
            return next(new ResponseError(500, "Something went wrong"));
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email: email });

            if (!user) {
                return next(new ResponseError(400, "User not found"));
            };

            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return next(new ResponseError(400, "Password is incorrect"));
            };

            // Create token
            const accessToken = createAccessToken({ id: user._id });

            return res.json({
                user,
                accessToken,
            });
        } catch (error) {
            console.log(error);
            return next(new ResponseError(500, "Something went wrong"));
        }
    },
}

export default userCtrl;