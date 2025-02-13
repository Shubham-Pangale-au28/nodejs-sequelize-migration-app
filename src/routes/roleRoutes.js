import express from "express";
import * as roleController from "../controllers/roleController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticate, roleController.createRole);
router.get("/", authenticate, roleController.getAllRoles);
router.put("/:id", authenticate, roleController.updateRole);
router.delete("/:id", authenticate, roleController.deleteRole);
router.post("/attach", authenticate, roleController.attachRoleToUser);
router.post("/detach", authenticate, roleController.detachRoleFromUser);

export default router;
