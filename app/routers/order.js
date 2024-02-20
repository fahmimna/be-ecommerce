import prisma from "../utils/prisma.js";
import { Router } from "express";
import { Permission } from "../auth/authorization.js";
import { authToken } from "../middleware/authToken.js";
import { authorizePermission } from "../middleware/authorizePermission.js";

const router = Router();

// add to order
router.post("/orders", authToken, authorizePermission(Permission.ADD_ORDER), async (req, res) => {
  
})