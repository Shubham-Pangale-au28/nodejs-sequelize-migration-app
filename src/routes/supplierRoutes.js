import express from "express";
import { body } from "express-validator";
import * as supplierController from "../controllers/supplierController.js";
import { authenticate } from "../middlewares/auth.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();

router.post("/", authenticate, checkPermission("create:supplier"), [body("name").notEmpty(), body("email").isEmail(), body("phone").notEmpty()], supplierController.createSupplier);

router.get("/", authenticate, checkPermission("read:supplier"), supplierController.getAllSuppliers);
router.get("/:id", authenticate, checkPermission("read:supplier"), supplierController.getSupplierById);
router.put("/:id", authenticate, checkPermission("update:supplier"), [body("name").optional().notEmpty(), body("email").optional().isEmail(), body("phone").optional().notEmpty()], supplierController.updateSupplier);
router.delete("/:id", authenticate, checkPermission("delete:supplier"), supplierController.deleteSupplier);

export default router;
