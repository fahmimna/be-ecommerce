import prisma from "../utils/prisma.js";

export const authorizePermission = (permission) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const listsPermission = await prisma.permissionsRole.findMany({
      where: {
        role_id: req.user.role_id,
      },
      include: {
        permission: true,
      },
    });

    const permissions = listsPermission.map(
      (element) => element.permission.name
    );

    if (!permissions.includes(permission)) {
      return res.status(401).json({ message: "Forbidden!" });
    }

    next();
  };
};
