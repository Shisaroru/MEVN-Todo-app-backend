import { Router } from "express";

import userCtrl from "../controllers/userController.js";

const router = Router();

router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

export default router;