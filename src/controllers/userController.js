import { User } from "../models.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { exportToCSV, exportToExcel, exportToPDF } from "../utils/exportData.js";
import fs from "fs";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, contactNumber, postcode, password, hobbies, gender, role } = req.body;

    const files = req.files.map((file) => file.path);

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      postcode,
      password,
      hobbies,
      gender,
      role,
      files: files.join(","),
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const exportUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    const { format } = req.query;
    let filename;

    switch (format) {
      case "csv":
        filename = await exportToCSV(users, "users.csv");
        break;
      case "excel":
        filename = await exportToExcel(users, "users.xlsx");
        break;
      case "pdf":
        filename = await exportToPDF(users, "users.pdf");
        break;
      default:
        return res.status(400).json({ message: "Invalid export format" });
    }

    res.download(filename, (err) => {
      if (err) {
        res.status(500).json({ message: "Error downloading file", error: err });
      }
      fs.unlinkSync(filename); // Delete the file after download
    });
  } catch (error) {
    res.status(500).json({ message: "Error exporting users", error });
  }
};

export const logout = async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error });
  }
};
