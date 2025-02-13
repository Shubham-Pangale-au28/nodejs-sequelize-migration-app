import express from "express";
import { body } from "express-validator";
import * as permissionController from "../controllers/permissionController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticate, [body("name").notEmpty(), body("description").optional()], permissionController.createPermission);

router.get("/", authenticate, permissionController.getAllPermissions);
router.put("/:id", authenticate, [body("name").optional().notEmpty(), body("description").optional()], permissionController.updatePermission);
router.delete("/:id", authenticate, permissionController.deletePermission);

router.post("/attach", authenticate, [body("roleId").isInt(), body("permissionId").isInt()], permissionController.attachPermissionToRole);

router.post("/detach", authenticate, [body("roleId").isInt(), body("permissionId").isInt()], permissionController.detachPermissionFromRole);

export default router;
