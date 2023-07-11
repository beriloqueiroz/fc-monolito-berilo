import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    // const response = await request(app)
    //   .post("/clients")
    //   .send({
    //     id: "1",
    //     name: "John",
    //     email: "john@x.com",
    //     document: "1236",
    //     street: "rua dos bobos",
    //     number: "0",
    //     complement: "",
    //     city: "doida",
    //     state: "NA",
    //     zipCode: "6000000"
    //   });

    // expect(response.status).toBe(200);
    // expect(response.body.name).toBe("John");
    // expect(response.body.email).toBe("john@x.com");
  });

  it("should not create a client", async () => {
    // const response = await request(app).post("/clients").send({
    //   name: "john",
    // });
    // expect(response.status).toBe(500);
  });

});
