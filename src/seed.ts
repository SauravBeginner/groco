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
        categoryId: "d6fcf44c-6fa3-4744-9daa-2be0c50a75bd", // Replace with actual category ID
        userId: "9d894d8d-c478-4112-a250-40a88f1c2097", // Replace with actual user ID
      },
      {
        name: "Mutton",
        description: "Fresh Mutton",
        price: "2200",
        thumbNail: "https://groco-nu.vercel.app/images/product-1.png",
        countInStock: 20,
        categoryId: "0ee19bb0-05e1-4192-8766-c1ac47c7d4dd", // Replace with actual category ID
        userId: "9d894d8d-c478-4112-a250-40a88f1c2097", // Replace with actual user ID
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
          i % 2 !== 0
            ? "d6fcf44c-6fa3-4744-9daa-2be0c50a75bd"
            : "0ee19bb0-05e1-4192-8766-c1ac47c7d4dd", // Replace with actual category IDs
        userId: "9d894d8d-c478-4112-a250-40a88f1c2097", // Replace with actual user ID
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
