import { faker } from "@faker-js/faker";
import prisma from "../utils/prisma.js"

const userSeeds = async () => {
  await prisma.products.deleteMany()

  for (let i = 0; i < 10; i++) {
    await prisma.products.create({
      data: {
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        stock: 10,
        category: faker.commerce.productAdjective(),
        description: faker.commerce.productDescription()
      }
    })
  }
};

userSeeds()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
