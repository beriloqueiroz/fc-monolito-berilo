import request from "supertest";
import { app, sequelize } from "../express";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import ProductModelCatalog from "../../modules/store-catalog/repository/product.model";

describe("E2E test for checkout", () => {
  beforeEach(async () => {
    await sequelize.addModels([ProductModelCatalog]);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should run a checkout", async () => {

    const facade = ClientAdmFacadeFactory.create();
    const inputClient = {
      id: "123",
      name: "Client 1",
      email: "x@x.com",
      document: "123456789",
      street: "Address 1",
      number: "1",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "ZipCode 1",
    };
    await facade.add(inputClient);

    const productFacade = ProductAdmFacadeFactory.create();
    const inputProduct = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      stock: 10,
    };
    await productFacade.addProduct(inputProduct);
    const inputProduct2 = {
      id: "2",
      name: "Product 2",
      description: "Product 2 description",
      purchasePrice: 11,
      stock: 1,
    };
    await productFacade.addProduct(inputProduct2);

    await ProductModelCatalog.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });
    await ProductModelCatalog.create({
      id: "2",
      name: "Product 2",
      description: "Description 2",
      salesPrice: 200,
    });


    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "123",
        products: [{ productId: "1" }, { productId: "2" }]
      });

    expect(response.status).toBe(200);
  });
});
