require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI not set in environment");
  process.exit(1);
}

// Define schemas inline
const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  slug: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: mongoose.Schema.Types.ObjectId,
  slug: String,
  image: String,
  rating: Number,
  reviews: Number,
  inStock: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "smart-fashion",
    });

    console.log("✓ Connected to MongoDB");

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("✓ Cleared existing data");

    // Seed categories
    const categories = await Category.insertMany([
      {
        name: "Formal Gown",
        description: "Elegant formal gowns for special occasions",
        image: "https://i.ibb.co/k0WM9Pj/formal-gown.webp",
        slug: "formal-gown",
      },
      {
        name: "Maxi Dress",
        description: "Beautiful maxi dresses for elegant style",
        image: "https://i.ibb.co/4pDxGk0/maxi-dress.webp",
        slug: "maxi-dress",
      },
      {
        name: "Cocktail Dress",
        description: "Chic cocktail dresses for evening events",
        image: "https://i.ibb.co/T8L3z5V/cocktail-dress.webp",
        slug: "cocktail-dress",
      },
      {
        name: "Seasonal Dress",
        description: "Trendy seasonal dresses for every occasion",
        image: "https://i.ibb.co/R6LKyvN/seasonal-dress.webp",
        slug: "seasonal-dress",
      },
    ]);

    console.log(`✓ Created ${categories.length} categories`);

    // Seed products
    const products = await Product.insertMany([
      {
        name: "Elegant Red Formal Gown",
        description:
          "A stunning red formal gown perfect for weddings and black-tie events",
        price: 150,
        category: categories[0]._id,
        slug: "elegant-red-formal-gown",
        image: "https://i.ibb.co/k0WM9Pj/formal-gown.webp",
        rating: 4.8,
        reviews: 24,
        inStock: true,
      },
      {
        name: "Lavender Maxi Dress",
        description: "Romantic lavender maxi dress with flowing fabric",
        price: 120,
        category: categories[1]._id,
        slug: "lavender-maxi-dress",
        image: "https://i.ibb.co/4pDxGk0/maxi-dress.webp",
        rating: 4.6,
        reviews: 18,
        inStock: true,
      },
      {
        name: "Pink Cocktail Dress",
        description: "Sophisticated pink cocktail dress for evening parties",
        price: 95,
        category: categories[2]._id,
        slug: "pink-cocktail-dress",
        image: "https://i.ibb.co/T8L3z5V/cocktail-dress.webp",
        rating: 4.7,
        reviews: 22,
        inStock: true,
      },
      {
        name: "Terracotta Seasonal Dress",
        description: "Warm terracotta seasonal dress perfect for autumn",
        price: 110,
        category: categories[3]._id,
        slug: "terracotta-seasonal-dress",
        image: "https://i.ibb.co/R6LKyvN/seasonal-dress.webp",
        rating: 4.9,
        reviews: 31,
        inStock: true,
      },
      {
        name: "Navy Blue Evening Gown",
        description: "Classic navy blue evening gown with elegant details",
        price: 160,
        category: categories[0]._id,
        slug: "navy-blue-evening-gown",
        image: "https://i.ibb.co/k0WM9Pj/formal-gown.webp",
        rating: 4.5,
        reviews: 15,
        inStock: true,
      },
      {
        name: "White Summer Maxi",
        description: "Flowing white maxi dress ideal for summer occasions",
        price: 105,
        category: categories[1]._id,
        slug: "white-summer-maxi",
        image: "https://i.ibb.co/4pDxGk0/maxi-dress.webp",
        rating: 4.8,
        reviews: 28,
        inStock: true,
      },
    ]);

    console.log(`✓ Created ${products.length} products`);
    console.log("✓ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("✗ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedData();
