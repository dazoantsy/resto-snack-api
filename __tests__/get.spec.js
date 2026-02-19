const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Category = require("../models/Category");
const User = require("../models/User");


const app = require("../app");

const MenuItem = require("../models/MenuItem");
const Order = require("../models/Order");

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

describe("GET Routes", () => {
  test("GET /menu-items → returns array", async () => {
    await MenuItem.create([
      { name: "Burger", category: "Meals", price: 10 },
      { name: "Juice", category: "Drinks", price: 3 },
    ]);

    const res = await request(app).get("/menu-items");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  test("GET /orders → returns array", async () => {
    await Order.create([
      {
        customerName: "Alice",
        tableNumber: 1,
        items: ["Burger"],
        totalPrice: 10,
        paymentMethod: "cash",
      },
    ]);

    const res = await request(app).get("/orders");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /menu-items/:id → returns single item", async () => {
    const item = await MenuItem.create({
      name: "Pizza",
      category: "Meals",
      price: 12,
    });

    const res = await request(app).get(`/menu-items/${item._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(item._id.toString());
  });

  test("GET /categories → returns array", async () => {
    await Category.create({ name: "Drinks" });

    const res = await request(app).get("/categories");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /categories/:id → returns single category", async () => {
    const cat = await Category.create({ name: "Desserts" });

    const res = await request(app).get(`/categories/${cat._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(cat._id.toString());
  });

  test("GET /users → returns array", async () => {
    await User.create({ githubId: "123", username: "njato" });

    const res = await request(app).get("/users");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /users/:id → returns single user", async () => {
    const user = await User.create({ githubId: "456", username: "testuser" });

    const res = await request(app).get(`/users/${user._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(user._id.toString());
  });

});
