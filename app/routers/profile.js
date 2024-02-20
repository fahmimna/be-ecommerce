import prisma from "../utils/prisma.js";
import { Router } from "express";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import { Permission } from "../auth/authorization.js";
import { authToken } from "../middlewares/authToken.js";
import { authorizePermission } from "../middlewares/authorizePermission.js";

const router = Router();
config();

const bcryptRound = process.env.BCRYPT_ROUNDS || 10;

// read profile
router.get("/profile", authToken, authorizePermission(Permission.READ_PROFILE), async (req, res) => {
  const id = req.user.id;

  try {
    const user = await prisma.users.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(user);
  } catch (err) {
    throw err;
  }
});

// edit profile
router.patch("/profile", authToken, authorizePermission(Permission.EDIT_PROFILE), async (req, res) => {
  const id = req.user.id;
  const { name = req.user.name, email = req.user.email, password = req.user.password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, bcryptRound);

  try {
    const user = await prisma.users.update({
      where: { id: Number(id) },
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    res.status(200).json({ message: "Successfully", user });
  } catch (err) {
    throw err;
  }
});

export default router;
