import prisma from "../utils/prisma.js";
import { Router } from "express";
import { Permission } from "../auth/authorization.js";
import { authToken } from "../middlewares/authToken.js";
import { authorizePermission } from "../middlewares/authorizePermission.js";

const router = Router();

// browse products
router.get("/products", authToken, authorizePermission(Permission.BROWSE_PRODUCTS), async (req, res) => {
  try {
    const product = await prisma.products.findMany();
    res.status(200).json({
      status: "success",
      data: product.flatMap((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          stock: product.stock,
          category: product.category,
        };
      }),
    });
  } catch (err) {
    throw err;
  }
});

// read product
router.get("/products/:id", authToken, authorizePermission(Permission.READ_PRODUCT), async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await prisma.products.findUnique({
      where: {
        id: Number(productId),
      },
    });
    res.status(200).json(product);
  } catch (err) {
    throw err;
  }
});

// edit product
router.patch("/products/:id", authToken, authorizePermission(Permission.EDIT_PRODUCT), async (req, res) => {
  const { name, price, stock, category, description } = req.body;
  const productId = req.params.id;

  try {
    const product = await prisma.products.update({
      where: { id: Number(productId) },
      data: { name, price, stock, category, description },
    });
    res.status(200).json({ message: "Successfully", product });
  } catch (err) {
    throw err;
  }
});

// add product
router.post("/products", authToken, authorizePermission(Permission.ADD_PRODUCT), async (req, res) => {
  const { name, price, stock, category, description } = req.body;

  try {
    const product = await prisma.products.create({
      data: { name, price, stock, category, description },
    });
    res.status(200).json({ message: "Successfully", product });
  } catch (err) {
    throw err;
  }
});

// delete product
router.delete("/products/:id", authToken, authorizePermission(Permission.DELETE_PRODUCT), async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await prisma.products.delete({
      where: { id: Number(productId) },
    });
    res.status(200).json({ message: "Successfully", product });
  } catch (err) {
    throw err;
  }
});

export default router;
