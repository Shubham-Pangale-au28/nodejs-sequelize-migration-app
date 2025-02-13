import { User, Role, Permission } from "../models.js";

export const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [
          {
            model: Role,
            include: [Permission],
          },
        ],
      });

      const hasPermission = user.Roles.some((role) => role.Permissions.some((permission) => permission.name === requiredPermission));

      if (hasPermission) {
        next();
      } else {
        res.status(403).json({ message: "Permission denied" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error checking permission", error });
    }
  };
};
