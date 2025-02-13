import { Supplier } from "../models.js";
import { validationResult } from "express-validator";

export const createSupplier = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Error creating supplier", error });
  }
};

export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching suppliers", error });
  }
};

export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Error fetching supplier", error });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const [updated] = await Supplier.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedSupplier = await Supplier.findByPk(req.params.id);
      return res.json(updatedSupplier);
    }
    throw new Error("Supplier not found");
  } catch (error) {
    res.status(500).json({ message: "Error updating supplier", error });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const deleted = await Supplier.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.json({ message: "Supplier deleted" });
    }
    throw new Error("Supplier not found");
  } catch (error) {
    res.status(500).json({ message: "Error deleting supplier", error });
  }
};
