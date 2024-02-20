import prisma from "../utils/prisma.js";
import { Router } from "express";
import { config } from "dotenv";
import bcrypt from "bcrypt";

const router = Router();
config();

const bcryptRound = process.env.BCRYPT_ROUNDS || 10;

// add user
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  const checkEmail = await prisma.users.findUnique({
    where: { email: email },
  });

  if (checkEmail) {
    return res.status(400).json({ message: "Email already exist" });
  }

  const userRole = await prisma.roles.findUnique({
    where: { name: role.toUpperCase() },
  });

  if (!userRole) {
    return res.status(400).json({ message: "Role does not exist" });
  }

  const hashedPassword = bcrypt.hashSync(password, bcryptRound);

  try {
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role_id: userRole.id,
      },
    });
    res.status(200).json({
      message: "Successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: userRole.name,
      },
    });
  } catch (err) {
    throw err;
  }
});

export default router;
