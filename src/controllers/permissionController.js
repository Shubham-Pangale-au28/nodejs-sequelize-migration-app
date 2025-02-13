import { Permission, Role } from "../models.js";
import { validationResult } from "express-validator";

export const createPermission = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const permission = await Permission.create(req.body);
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ message: "Error creating permission", error });
  }
};

export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching permissions", error });
  }
};

export const updatePermission = async (req, res) => {
  try {
    const [updated] = await Permission.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedPermission = await Permission.findByPk(req.params.id);
      return res.json(updatedPermission);
    }
    throw new Error("Permission not found");
  } catch (error) {
    res.status(500).json({ message: "Error updating permission", error });
  }
};

export const deletePermission = async (req, res) => {
  try {
    const deleted = await Permission.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.json({ message: "Permission deleted" });
    }
    throw new Error("Permission not found");
  } catch (error) {
    res.status(500).json({ message: "Error deleting permission", error });
  }
};

export const attachPermissionToRole = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;
    const role = await Role.findByPk(roleId);
    const permission = await Permission.findByPk(permissionId);

    if (!role || !permission) {
      return res.status(404).json({ message: "Role or Permission not found" });
    }

    await role.addPermission(permission);
    res.json({ message: "Permission attached to role successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error attaching permission to role", error });
  }
};

export const detachPermissionFromRole = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;
    const role = await Role.findByPk(roleId);
    const permission = await Permission.findByPk(permissionId);

    if (!role || !permission) {
      return res.status(404).json({ message: "Role or Permission not found" });
    }

    await role.removePermission(permission);
    res.json({ message: "Permission detached from role successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error detaching permission from role", error });
  }
};
