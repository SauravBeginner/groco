import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.product.createMany({
    data: [
      {
        name: "Cabbage",
        description: "Fresh cabbage",
        price: "199",
        thumbNail: "https://groco-nu.vercel.app/images/product-1.png",
        countInStock: 50,
        categoryId: "a2766a7f-e460-4b6d-8f37-f9c21608739e", // Replace with actual category ID
        userId: "14698489-294a-4673-b9af-7526cd5b9943", // Replace with actual user ID
      },
      {
        name: "Mutton",
        description: "Fresh Mutton",
        price: "2200",
        thumbNail: "https://groco-nu.vercel.app/images/product-2.png",
        countInStock: 20,
        categoryId: "ce8685f7-4068-45c0-a86e-3b2100eb4144", // Replace with actual category ID
        userId: "14698489-294a-4673-b9af-7526cd5b9943", // Replace with actual user ID
      },
    ].concat(
      Array.from({ length: 48 }).map((_, i) => ({
        name: i % 2 === 0 ? `Vegetable ${i}` : `Non-Veg Item ${i}`,
        description:
          i % 2 === 0 ? `Fresh Vegetable ${i}` : `Fresh Non-Veg Item ${i}`,
        price: (i % 2 === 0 ? 100 + i * 2 : 1000 + i * 10).toString(),
        thumbNail:
          i % 2 === 0
            ? `https://groco-nu.vercel.app/images/product-1.png`
            : `https://groco-nu.vercel.app/images/product-5.png`,
        countInStock: Math.floor(Math.random() * 100),
        categoryId:
          i % 2 === 0
            ? "a2766a7f-e460-4b6d-8f37-f9c21608739e"
            : "ce8685f7-4068-45c0-a86e-3b2100eb4144", // Replace with actual category IDs
        userId: "14698489-294a-4673-b9af-7526cd5b9943", // Replace with actual user ID
      }))
    ),
  });

  console.log("Seed successfully!");
};

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
