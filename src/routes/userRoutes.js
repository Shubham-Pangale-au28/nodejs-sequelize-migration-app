import express from "express";
import { body } from "express-validator";
import * as userController from "../controllers/userController.js";
import { authenticate } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/register",
  upload.array("files", 5),
  [
    body("firstName").isAlphanumeric(),
    body("lastName").isAlphanumeric(),
    body("email").isEmail(),
    body("contactNumber").isMobilePhone(),
    body("postcode").isNumeric(),
    body("password").isLength({ min: 6 }),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ],
  userController.register
);

router.post("/logout", authenticate, userController.logout);

router.get("/", authenticate, userController.getAllUsers);
router.get("/:id", authenticate, userController.getUserById);
router.put("/:id", authenticate, [body("firstName").optional().isAlphanumeric(), body("lastName").optional().isAlphanumeric(), body("email").optional().isEmail(), body("contactNumber").optional().isMobilePhone(), body("postcode").optional().isNumeric()], userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);

router.get("/export", authenticate, userController.exportUsers);

export default router;
