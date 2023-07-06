import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/address.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import { FindInvoiceUseCaseInputDTO } from "./find-invoice.dto";
import FindInvoiceUseCase from "./find-invoice.usecase";

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
  ],
})

const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};


describe("Find invoice usecase unit test", () => {
  it("should find a invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new FindInvoiceUseCase(invoiceRepository);
    const input: FindInvoiceUseCaseInputDTO = {
      id: invoice.id.id
    };

    const result = await usecase.execute(input);

    expect(result.id).toBe(invoice.id.id);
    expect(invoiceRepository.find).toHaveBeenCalled();
    expect(result.total).toBe(35);
    expect(result.items).toHaveLength(2);
    expect(result.items[0].id).toBe("123");
    expect(result.items[1].id).toBe("321");
  });

})