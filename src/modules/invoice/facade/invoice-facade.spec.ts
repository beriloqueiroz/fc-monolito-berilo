import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/facade.factory";
import InvoiceModel from "../repository/invoice.model";
import { ProductModel } from "../repository/product.model";
import { FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice-facade.interface";

describe("Invoice Facade unit test", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should be create a invoice with facade", async () => {
    const facade = InvoiceFacadeFactory.create();

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

    const output: GenerateInvoiceFacadeOutputDto = await facade.generate(input);

    expect(output.items.length).toBe(2);
    expect(output.total).toBe(35);
    expect(output.city).toBe("fantasma");
    expect(output.items[0].name).toBe("Product 1");
    expect(output.items[1].name).toBe("Product 2");
  });


  it("should be find a invoice with facade", async () => {
    const facade = InvoiceFacadeFactory.create();

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

    const result: GenerateInvoiceFacadeOutputDto = await facade.generate(input);

    const output: FindInvoiceFacadeOutputDTO = await facade.find({ id: result.id })

    expect(output.items.length).toBe(2);
    expect(output.total).toBe(35);
    expect(output.items[0].name).toBe("Product 1");
    expect(output.items[1].name).toBe("Product 2");

  });

})