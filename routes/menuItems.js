const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuItemsController");

/**
 * @openapi
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         category:
 *           type: string
 *         price:
 *           type: number
 *         available:
 *           type: boolean
 */

/**
 * @openapi
 * /menu-items:
 *   get:
 *     summary: Get all menu items
 *     tags:
 *       - MenuItems
 *     responses:
 *       200:
 *         description: List of menu items
 */
router.get("/", getMenuItems);

/**
 * @openapi
 * /menu-items/{id}:
 *   get:
 *     summary: Get one menu item by id
 *     tags:
 *       - MenuItems
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: One menu item
 *       404:
 *         description: Menu item not found
 */
router.get("/:id", getMenuItemById);

/**
 * @openapi
 * /menu-items:
 *   post:
 *     summary: Create a new menu item
 *     tags:
 *       - MenuItems
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 */
router.post("/", requireAuth, createMenuItem);

/**
 * @openapi
 * /menu-items/{id}:
 *   put:
 *     summary: Update a menu item by id
 *     tags:
 *       - MenuItems
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       200:
 *         description: Updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Menu item not found
 */
router.put("/:id", requireAuth, updateMenuItem);

/**
 * @openapi
 * /menu-items/{id}:
 *   delete:
 *     summary: Delete a menu item by id
 *     tags:
 *       - MenuItems
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Menu item not found
 */
router.delete("/:id", requireAuth, deleteMenuItem);

module.exports = router;
