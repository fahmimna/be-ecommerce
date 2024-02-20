import prisma from "../utils/prisma.js";
import { Router } from "express";
import { Permission } from "../auth/authorization.js";
import { authToken } from "../middlewares/authToken.js";
import { authorizePermission } from "../middlewares/authorizePermission.js";

const router = Router();

// add to cart
router.post("/carts", authToken, authorizePermission(Permission.ADD_TO_CART), async (req, res) => {
  const { product_id, quantity } = req.body;

  const product = await prisma.products.findFirst({
    where: { id: product_id },
  })

  try {
    const addedProduct = await prisma.carts.create({
      data: {
        product_id: product_id, 
        quantity: quantity,
        total: product.price * quantity,
        user_id: req.user.id
      },
    });
    res
      .status(200)
      .json({ message: "Successfully", addedProduct });
  } catch (err) {
    throw err;
  }
});

// read cart
router.get("/carts", authToken, authorizePermission(Permission.READ_CART), async (req, res) => {
  try {
    const user_id = req.user.id
    const cart = await prisma.carts.findMany({
      where: { user_id },
    });
    const [carts] = cart

    if (!carts) {
      return res.status(404).json({ message: "Not found" });
    }

    const total = cart.reduce((sum, item) => sum + item.total, 0);

    res.status(200).json({ cart, total })
  } catch (err) {
    throw err;
  }
});

// delete from cart
router.delete("/carts/:cart_id", authToken, authorizePermission(Permission.DELETE_FROM_CART), async (req, res) => {
  const cart_id = req.params.cart_id;
  const user_id = req.user.id;

  try {
    const checkedProductCart = await prisma.carts.findFirst({
      where: { id: Number(cart_id), user_id: Number(user_id) },
    })

    if (!checkedProductCart) {
      return res.status(404).json({ message: "Not found" });
    }

    const deletedProduct = await prisma.carts.delete({
      where: { id: Number(cart_id), user_id: Number(user_id) },
    });
    res.status(200).json({ message: "Successfully", deletedProduct });
  } catch (err) {
    throw err;
  }
})

export default router;
