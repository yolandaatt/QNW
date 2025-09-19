import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";

const testProduct = {
  title: "Testprodukt",
  price: 123.45,
  imageUrl: "https://via.placeholder.com/150",
  description: "Detta är en testprodukt",
};

let createdId: string;

console.log("🔎 URI from env:", process.env.MONGO_URI_TEST);

beforeAll(async () => {
  const uri = process.env.MONGO_URI_TEST;
  if (!uri) throw new Error("MONGO_URI_TEST is not defined");
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Products API", () => {
  it("should create a new product", async () => {
    const res = await request(app).post("/api/products").send(testProduct);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe(testProduct.title);
    createdId = res.body._id;
  });

  it("should get all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get a single product by id", async () => {
    const res = await request(app).get(`/api/products/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(createdId);
    expect(res.body.title).toBe(testProduct.title);
  });

  it("should update a product", async () => {
    const res = await request(app)
      .put(`/api/products/${createdId}`)
      .send({ title: "Uppdaterad produkt" });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Uppdaterad produkt");
  });

  it("should delete a product", async () => {
    const res = await request(app).delete(`/api/products/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });

  it("should return 404 for a deleted product", async () => {
    const res = await request(app).get(`/api/products/${createdId}`);
    expect(res.status).toBe(404);
  });
});
