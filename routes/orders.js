const express = require("express");
const router = express.Router();

const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordersController");

/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - customerName
 *         - tableNumber
 *         - items
 *         - totalPrice
 *         - paymentMethod
 *       properties:
 *         customerName:
 *           type: string
 *         tableNumber:
 *           type: integer
 *         items:
 *           type: array
 *           items:
 *             type: string
 *         totalPrice:
 *           type: number
 *         status:
 *           type: string
 *           enum: [pending, preparing, served]
 *         paymentMethod:
 *           type: string
 *         orderedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @openapi
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get("/", getOrders);

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     summary: Get one order by id
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: One order
 *       404:
 *         description: Order not found
 */
router.get("/:id", getOrderById);

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", createOrder);

/**
 * @openapi
 * /orders/{id}:
 *   put:
 *     summary: Update an order by id
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Order not found
 */
router.put("/:id", updateOrder);

/**
 * @openapi
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by id
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Order not found
 */
router.delete("/:id", deleteOrder);

module.exports = router;
