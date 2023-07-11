import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import Invoice from "../domain/invoice.entity";
import Address from "../domain/address.value-object";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceRepository from "./invoice.repository";
import ProductInvoiceModel from "./product.model";


describe("Invoice repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, ProductInvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should be create a invoice", async () => {

    const invoice = new Invoice({
      address: new Address({
        street: "rua dos bobos",
        city: "fantasma",
        complement: "",
        number: "0",
        state: "NU",
        zipCode: "6000000",
      }),
      name: "fulano",
      document: "1236",
      items: [
        new Product({
          id: new Id("123"),
          name: "Produto 1",
          price: 15,
        }),
        new Product({
          id: new Id("321"),
          name: "Produto 2",
          price: 20,
        })
      ]
    })

    const repository = new InvoiceRepository();
    await repository.save(invoice);

    const result = await InvoiceModel.findOne({ include: [ProductInvoiceModel] });

    expect(result.items.length).toBe(2);
    expect(result.items[0].name).toBe("Produto 1");
    expect(result.id).toBeDefined();
    expect(result.street).toBe("rua dos bobos")

  })

})