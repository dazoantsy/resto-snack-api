const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

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
});
