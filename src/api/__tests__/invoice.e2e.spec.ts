import request from "supertest";
import { GenerateInvoiceFacadeInputDto } from "../../modules/invoice/facade/invoice-facade.interface";
import InvoiceFacadeFactory from "../../modules/invoice/factory/facade.factory";
import { app, sequelize } from "../express";

describe("E2E test for invoice", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should find a invoice", async () => {

    const input: GenerateInvoiceFacadeInputDto = {
      street: "rua dos bobos",
      city: "fantasma",
      complement: "",
      number: "0",
      state: "NU",
      zipCode: "6000000",
      document: "1236",
      name: "fulano de tal",
      items: [
        {
          id: '123',
          name: "Product 1",
          price: 15,
        },
        {
          id: "321",
          name: "Product 2",
          price: 20,
        }
      ],
    };

    const facade = InvoiceFacadeFactory.create();

    const invoiceCreated = await facade.generate(input);

    const response = await request(app).get("/invoice/" + invoiceCreated.id);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("fulano de tal");

  });

});
