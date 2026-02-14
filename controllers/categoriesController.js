const Category = require("../models/Category");

// GET /categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

// GET /categories/:id
exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

// POST /categories
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({ message: "name is required" });
    }

    const created = await Category.create({
      name: String(name).trim(),
      description: description ? String(description).trim() : "",
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

// PUT /categories/:id
exports.updateCategory = async (req, res, next) => {
  try {
    const updates = {};

    if (req.body.name !== undefined) {
      if (!String(req.body.name).trim()) {
        return res.status(400).json({ message: "name cannot be empty" });
      }
      updates.name = String(req.body.name).trim();
    }

    if (req.body.description !== undefined) {
      updates.description = String(req.body.description).trim();
    }

    const updated = await Category.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /categories/:id
exports.deleteCategory = async (req, res, next) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Category not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
