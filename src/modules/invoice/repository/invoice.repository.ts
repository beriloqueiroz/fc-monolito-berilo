import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import { ProductModel } from "./product.model";


export default class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {

    const all = await InvoiceModel.findAll();

    const output = await InvoiceModel.findOne({
      where: { id: id },
      include: [ProductModel]
    });
    return new Invoice({
      address: new Address({
        city: output.city,
        complement: output.complement,
        number: output.number,
        state: output.state,
        street: output.street,
        zipCode: output.zipCode
      }),
      document: output.document,
      items: output.items.map(item => new Product({
        name: item.name,
        price: item.price,
        id: new Id(item.id)
      })),
      name: output.name,
      id: new Id(output.id),
    });
  }
  async save(input: Invoice): Promise<Invoice> {
    const result = await InvoiceModel.create({
      id: input.id.id,
      street: input.address.street,
      city: input.address.city,
      complement: input.address.complement,
      number: input.address.number,
      state: input.address.state,
      zipCode: input.address.zipCode,
      document: input.document,
      name: input.name,
      items: input.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
        invoiceId: input.id.id
      })),
      total: input.items.reduce((acc, a) => acc + a.price, 0),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    }, { include: [ProductModel] });
    return new Invoice({
      id: new Id(result.id),
      address: new Address({
        city: result.city,
        complement: result.complement,
        number: result.complement,
        state: result.number,
        street: result.street,
        zipCode: result.zipCode,
      }),
      name: result.name,
      document: result.document,
      items: input.items.map(item => new Product({
        id: item.id,
        name: item.name,
        price: item.price,
      }))
    });
  }
}