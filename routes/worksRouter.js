import { Router } from "express";

//import userCtrl from "../controllers/userCtroller.js";

const router = Router();

router.post('/add', userCtrl.register);

router.post('/finish', userCtrl.login);

export default router;