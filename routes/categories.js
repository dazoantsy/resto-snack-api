const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesController");

/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/", getCategories);

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     summary: Get one category by id
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: One category
 *       404:
 *         description: Category not found
 */
router.get("/:id", getCategoryById);

/**
 * @openapi
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", requireAuth, createCategory);

/**
 * @openapi
 * /categories/{id}:
 *   put:
 *     summary: Update a category by id
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.put("/:id", requireAuth, updateCategory);

/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by id
 *     tags:
 *       - Categories
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
 *         description: Category not found
 */
router.delete("/:id", requireAuth, deleteCategory);

module.exports = router;
