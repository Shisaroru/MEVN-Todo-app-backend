import jwt from "jsonwebtoken";

import { ResponseError } from "../class/ResponseError.js";
import { config } from "../config.js";

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) return next(new ResponseError(400, "Invalid authentication"))

        jwt.verify(token, config.accessSecret,
            (err, user) => {
                if (err) return next(new ResponseError(400, "Invalid authentication"))
                next()
            })
    } catch (err) {
        console.log(err);
        return next(new ResponseError(500, "Can't authenticate"));
    }
}

export default auth