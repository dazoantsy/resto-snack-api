const User = require("../models/User");

// GET /users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// GET /users/:id
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// POST /users
// Note: In most real apps users are created via OAuth.
// We keep this endpoint for the course CRUD requirement.
exports.createUser = async (req, res, next) => {
  try {
    const { githubId, username, displayName, role } = req.body;

    if (!githubId || !String(githubId).trim()) {
      return res.status(400).json({ message: "githubId is required" });
    }
    if (!username || !String(username).trim()) {
      return res.status(400).json({ message: "username is required" });
    }

    const created = await User.create({
      githubId: String(githubId).trim(),
      username: String(username).trim(),
      displayName: displayName ? String(displayName).trim() : "",
      role: role ? String(role).trim() : "viewer",
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

// PUT /users/:id
exports.updateUser = async (req, res, next) => {
  try {
    const updates = {};

    if (req.body.username !== undefined) {
      if (!String(req.body.username).trim()) {
        return res.status(400).json({ message: "username cannot be empty" });
      }
      updates.username = String(req.body.username).trim();
    }

    if (req.body.displayName !== undefined) {
      updates.displayName = String(req.body.displayName).trim();
    }

    if (req.body.role !== undefined) {
      const role = String(req.body.role).trim();
      if (!["admin", "staff", "viewer"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
      updates.role = role;
    }

    const updated = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /users/:id
exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
