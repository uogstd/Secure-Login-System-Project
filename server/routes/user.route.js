import express from "express";
const router = express.Router();
import { signOut, test } from "../controllers/user.controller.js";

router.get("/test", test);
router.post("/signout", signOut);

export default router;
