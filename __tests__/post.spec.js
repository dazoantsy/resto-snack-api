const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const jwt = require("jsonwebtoken");

const app = require("../app");
const MenuItem = require("../models/MenuItem");

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe("POST Routes", () => {
  test("POST /menu-items → creates item (authorized)", async () => {
    // Use the same JWT secret as your app (fallback if not set in env for tests)
    const secret = process.env.JWT_SECRET || "super_secret_jwt_key";

    const token = jwt.sign(
      { userId: "test-user", username: "jest", role: "admin" },
      secret,
      { expiresIn: "1h" },
    );

    const res = await request(app)
      .post("/menu-items")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pizza",
        category: "Meals",
        price: 12,
        available: true,
      });

    expect([200, 201]).toContain(res.statusCode);

    const items = await MenuItem.find();
    expect(items.length).toBe(1);
  });
});
