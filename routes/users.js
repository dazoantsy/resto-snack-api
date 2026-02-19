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

const validateUser = (req, res, next) => {
  const { githubId, username, displayName, role } = req.body;

  if (req.method === "POST") {
    if (!githubId || typeof githubId !== "string") {
      return res.status(400).json({ message: "Invalid githubId" });
    }

    if (!username || typeof username !== "string" || !username.trim()) {
      return res.status(400).json({ message: "Invalid username" });
    }
  }

  if (req.method === "PUT") {
    if (githubId !== undefined && typeof githubId !== "string") {
      return res.status(400).json({ message: "Invalid githubId" });
    }

    if (
      username !== undefined &&
      (typeof username !== "string" || !username.trim())
    ) {
      return res.status(400).json({ message: "Invalid username" });
    }

    if (displayName !== undefined && typeof displayName !== "string") {
      return res.status(400).json({ message: "Invalid displayName" });
    }

    if (role !== undefined && !["admin", "staff", "viewer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
  }

  next();
};


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
router.post("/", requireAuth, validateUser, createUser);

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
router.put("/:id", requireAuth, validateUser, updateUser);

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
