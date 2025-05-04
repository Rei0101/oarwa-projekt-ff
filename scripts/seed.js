import mongoose from "mongoose";
import dotenv from "dotenv";
import rawUsers from "../data/users.json" assert { type: "json" };
import rawCategories from "../data/categories.json" assert { type: "json" };
import rawIngredients from "../data/ingredients.json" assert { type: "json" };
import rawMenuItems from "../data/menuItems.json" assert { type: "json" };
import { User } from "../server/models/userModel.js";
import { Category } from "../server/models/categoryModel.js";
import { Ingredient } from "../server/models/ingredientModel.js";
import { MenuItem } from "../server/models/menuItemModel.js";

dotenv.config();

async function seedDB() {
  const dummyUsers = rawUsers.map((user) => ({
    ...user,
    _id: user._id?.$oid || user._id,
    dateOfBirth: user.dateOfBirth?.$date || user.dateOfBirth,
  }));
  const dummyCategories = rawCategories.map((category) => ({
    ...category,
    _id: category._id?.$oid || category._id,
  }));
  const dummyIngredients = rawIngredients.map((ingredient) => ({
    ...ingredient,
    _id: ingredient._id?.$oid || ingredient._id,
    categories:
      ingredient.categories?.map((category) => category.$oid ?? category) || [],
  }));
  const dummyMenuItems = rawMenuItems.map((menuItem) => ({
    ...menuItem,
    _id: menuItem._id?.$oid || menuItem._id,
    categories:
      menuItem.categories?.map((category) => category.$oid ?? category) || [],
    ingredients:
      menuItem.ingredients?.map(
        (ingredient) => ingredient.$oid ?? ingredient
      ) || [],
  }));

  try {
    await mongoose.connect(process.env.DB_URI);
    await User.deleteMany();
    await User.insertMany(dummyUsers);
    await Category.deleteMany();
    await Category.insertMany(dummyCategories);
    await Ingredient.deleteMany();
    await Ingredient.insertMany(dummyIngredients);
    await MenuItem.deleteMany();
    await MenuItem.insertMany(dummyMenuItems);
    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seedDB();
