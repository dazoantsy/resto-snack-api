const cors = require("cors");
const express = require("express");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const connectDB = require("./config/db");

const session = require("express-session");
const passport = require("passport");

require("./config/passport"); // <-- on va créer ce fichier juste après

const app = express();
app.use(express.json());

app.use(cors());


// Session (required for OAuth with Passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "change-this-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.json", (req, res) => res.json(swaggerSpec));

app.get("/", (req, res) => {
  res.send("resto-snack-api running");
});

// Auth routes (OAuth)
app.use("/auth", require("./routes/auth"));

// API routes
app.use("/orders", require("./routes/orders"));
app.use("/menu-items", require("./routes/menuItems"));
app.use("/categories", require("./routes/categories"));
app.use("/users", require("./routes/users"));

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Server error" });
});

const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
