import express from "express";
import { body } from "express-validator";
import * as customerController from "../controllers/customerController.js";
import { authenticate } from "../middlewares/auth.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();

router.post("/", authenticate, checkPermission("create:customer"), [body("name").notEmpty(), body("email").isEmail(), body("phone").notEmpty()], customerController.createCustomer);

router.get("/", authenticate, checkPermission("read:customer"), customerController.getAllCustomers);
router.get("/:id", authenticate, checkPermission("read:customer"), customerController.getCustomerById);
router.put("/:id", authenticate, checkPermission("update:customer"), [body("name").optional().notEmpty(), body("email").optional().isEmail(), body("phone").optional().notEmpty()], customerController.updateCustomer);
router.delete("/:id", authenticate, checkPermission("delete:customer"), customerController.deleteCustomer);

export default router;
