import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/address.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import { GenerateInvoiceUseCaseInputDto } from "./generate-invoice.dto";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

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


describe("Generate invoice usecase unit test", () => {
  it("should generate a invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(invoiceRepository);
    const input: GenerateInvoiceUseCaseInputDto = {
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
          name: "Produto 1",
          price: 15,
        },
        {
          id: "321",
          name: "Produto 2",
          price: 20,
        }
      ],
    };

    const result = await usecase.execute(input);

    expect(result.id).toBe(invoice.id.id);
    expect(invoiceRepository.save).toHaveBeenCalled();
    expect(result.street).toBe("rua dos bobos");
    expect(result.total).toBe(35);
    expect(result.items).toHaveLength(2);
    expect(result.items[0].id).toBe("123");
    expect(result.items[1].id).toBe("321");
  });

})