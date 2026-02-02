const MenuItem = require("../models/MenuItem");

// GET all menu items
const getMenuItems = async (req, res, next) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// GET one menu item by id
const getMenuItemById = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// CREATE menu item
const createMenuItem = async (req, res, next) => {
  try {
    const created = await MenuItem.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

// UPDATE menu item
const updateMenuItem = async (req, res, next) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE menu item
const deleteMenuItem = async (req, res, next) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
