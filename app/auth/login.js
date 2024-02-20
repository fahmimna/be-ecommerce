import prisma from "../utils/prisma.js";
import { Router } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: { email: email },
      include: {
        role: true,
      }
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Sorry, User Not Found" });
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid" });
    }

    const checkToken = await prisma.tokens.findUnique({
      where: { user_id: user.id },
    })

    if (!checkToken) {
      //Generate Token
      let token;
      do {
        token = crypto.randomBytes(64).toString("base64"); //base64
      } while (await prisma.tokens.findUnique({ where: { token } }));
  
      await prisma.tokens.create({
        data: {
          token,
          user_id: user.id,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      });
  
      res.status(200).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.name,
        },
      });
    } else {
      res.status(200).json({
        token: checkToken.token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.name,
        },
      });
    }
  } catch (err) {
    throw err;
  }
});

export default router;
