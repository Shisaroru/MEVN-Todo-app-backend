import { Router } from "express";

import workCtrl from "../controllers/workController.js";

import auth from "../middleware/auth.js";

const router = Router();

router.post("/getOneWork", auth, workCtrl.getOneWork);

router.post("/getWorks", auth, workCtrl.getWorks);

router.post("/add", auth, workCtrl.add);

router.delete("/delete", auth, workCtrl.delete);

router.patch("/edit", auth, workCtrl.edit);

router.post("/finished", auth, workCtrl.finished);

export default router;
