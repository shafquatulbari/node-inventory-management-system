const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");

// Get all categories
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// Create a new category
const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = new Category({
    name,
    description,
  });
  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// Update category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const category = await Category.findById(id);

  if (category) {
    category.name = name || category.name;
    category.description = description || category.description;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// Delete category
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await category.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
