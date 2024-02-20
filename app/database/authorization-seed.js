import prisma from "../utils/prisma.js";
import {
  Role,
  Permission,
  PermissionAssigntment,
} from "../auth/authorization.js";

const main = async () => {
  await prisma.cart.deleteMany();
  await prisma.token.deleteMany();
  await prisma.categoryProduct.deleteMany();
  await prisma.product.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();
  await prisma.permissionRole.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();

  for (let role in Role) {
    await prisma.roles.create({
      data: {
        name: Role[role],
      },
    });
  }

  for (let permission in Permission) {
    await prisma.permissions.create({
      data: {
        name: Permission[permission],
      },
    });
  }

  for (const role in PermissionAssigntment) {
    const roleRecord = await prisma.roles.findUnique({
      where: {
        name: role,
      },
    });

    for (const permission of PermissionAssigntment[role]) {
      const permissionRecord = await prisma.permissions.findUnique({
        where: {
          name: permission,
        },
      });

      await prisma.permissionsRole.create({
        data: {
          role_id: roleRecord.id,
          permission_id: permissionRecord.id,
        },
      });
    }
  }
};

main().catch((e) => {
  throw e;
});
