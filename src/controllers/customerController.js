import { Customer } from "../models.js";
import { validationResult } from "express-validator";

export const createCustomer = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error creating customer", error });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer", error });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const [updated] = await Customer.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedCustomer = await Customer.findByPk(req.params.id);
      return res.json(updatedCustomer);
    }
    throw new Error("Customer not found");
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.json({ message: "Customer deleted" });
    }
    throw new Error("Customer not found");
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error });
  }
};
