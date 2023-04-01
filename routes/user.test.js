process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");


let pickle = { name: "pickle", price: 3.2 }

beforeEach(() => {
  items.push(pickle)
})


afterEach(() => {
  items.length = 0
})

describe("GET /items", () => {
  test("Get all items from shopping list", async () => {
    const res = await request(app).get('/items')
    expect(res.statusCode).toBe(200)
    expect(res.body.response).toEqual([pickle])
  })

})

describe("POST /items", () => {
  test("Create an item", async () => {
    const res = await request(app)
      .post('/items')
      .send({
        name: "gummy bear",
        price: 2.5
      })
    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual({
      added: {
        name: "gummy bear",
        price: 2.5
      }
    })
  })
})

describe("PATCH /items/:name", () => {
  test("Update an item", async () => {
    const res = await request(app)
      .patch(`/items/${pickle.name}`)
      .send({
        name: "candy cane"
      })
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      updated: {
        name: "candy cane",
        price: 3.2
      }
    })
  })
  test("Responds with 404 if name invalid", async () => {
    const res = await request(app).patch('/items/fries')
    expect(res.statusCode).toBe(404)

  })
})

describe("DELETE /items/:name", () => {
  test("Delete an item", async () => {
    const res = await request(app).delete(`/items/${pickle.name}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ message: "Deleted" })
  })
})
