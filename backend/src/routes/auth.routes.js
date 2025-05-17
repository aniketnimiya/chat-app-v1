import express from "express";



const router=express.Router();



import { signup , login , logout , updateProfile , checkAuth , getAllUsers} from "../controllers/auth.controllers.js";
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

import { protectRoute } from "../middlewares/auth.middleware.js";
router.put("/update-profile", protectRoute ,updateProfile);

router.get("/check", protectRoute , checkAuth);

router.get("/all-users", protectRoute, getAllUsers); 



export default router;