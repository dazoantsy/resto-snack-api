const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - githubId
 *         - username
 *       properties:
 *         githubId:
 *           type: string
 *         username:
 *           type: string
 *         displayName:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, staff, viewer]
 */

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", getUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get one user by id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: One user
 *       404:
 *         description: User not found
 */
router.get("/:id", getUserById);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", requireAuth, createUser);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update a user by id
 *     tags:
 *       - Users
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put("/:id", requireAuth, updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by id
 *     tags:
 *       - Users
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
 *         description: User not found
 */
router.delete("/:id", requireAuth, deleteUser);

module.exports = router;
