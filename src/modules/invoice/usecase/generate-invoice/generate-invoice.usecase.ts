import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Address from "../../domain/address.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";


export default class GenerateInvoiceUseCase implements UseCaseInterface {

  constructor(private invoiceRepository: InvoiceGateway) {
  }

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const invoice = new Invoice({
      address: new Address({
        city: input.city,
        complement: input.complement,
        number: input.complement,
        state: input.number,
        street: input.street,
        zipCode: input.zipCode,
      }),
      name: input.name,
      document: input.document,
      items: input.items.map(item => new Product({
        name: item.name,
        price: item.price,
      }))
    })
    const output = await this.invoiceRepository.save(invoice);
    return {
      ...input,
      id: output.id.id,
      total: output.total
    };
  }

}