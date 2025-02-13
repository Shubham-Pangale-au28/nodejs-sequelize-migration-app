import { Role, User } from "../models.js";

export const createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: "Error creating role", error });
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles", error });
  }
};

export const updateRole = async (req, res) => {
  try {
    const [updated] = await Role.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedRole = await Role.findByPk(req.params.id);
      return res.json(updatedRole);
    }
    throw new Error("Role not found");
  } catch (error) {
    res.status(500).json({ message: "Error updating role", error });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const deleted = await Role.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.json({ message: "Role deleted" });
    }
    throw new Error("Role not found");
  } catch (error) {
    res.status(500).json({ message: "Error deleting role", error });
  }
};

export const attachRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      return res.status(404).json({ message: "User or Role not found" });
    }

    await user.addRole(role);
    res.json({ message: "Role attached to user successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error attaching role to user", error });
  }
};

export const detachRoleFromUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      return res.status(404).json({ message: "User or Role not found" });
    }

    await user.removeRole(role);
    res.json({ message: "Role detached from user successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error detaching role from user", error });
  }
};
