import mongoose, { mongo } from "mongoose";
import { faker, Faker } from "@faker-js/faker";
import dotenv from "dotenv";
import product from "./Models/products.model.js";

dotenv.config();

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Kitchen",
  "Sports",
  "Beauty",
  "Automotive",
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongodb connected for seeding");

    await product.deleteMany({});
    console.log("Deleted Existing Products .");

    const totalProducts = 200000;
    const batchSize = 20000;

    for (let i = 0; i < totalProducts; i += batchSize) {
      const currentProducts = [];

      for (let j = 0; j < batchSize; j++) {
        currentProducts.push({
          name: faker.commerce.productName(),
          category: categories[Math.floor(Math.random() * categories.length)],
          price: parseFloat(
            faker.commerce.price({ min: 10, max: 1000, dec: 2 }),
          ),
        });
      }
      await product.insertMany(currentProducts, { ordered: false });
      console.log(
        `Progress: Inserted ${i + batchSize} / ${totalProducts} products`,
      );
    }

    console.log(
      `Added ${totalProducts} products in database .`,
    );
    process.exit(0);
  } catch (error) {
    console.log(
      `Error while creating the products inside the database : ${error}`,
    );
    process.exit(1);
  }
};

seedDatabase();