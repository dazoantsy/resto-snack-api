const Order = require("../models/Order");

// GET all orders
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// GET one order by id
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
};

// CREATE order
const createOrder = async (req, res, next) => {
  try {
    const created = await Order.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

// UPDATE order
const updateOrder = async (req, res, next) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE order
const deleteOrder = async (req, res, next) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
