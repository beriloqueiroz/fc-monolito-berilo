import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {

  constructor(private invoiceRepository: InvoiceGateway) {
  }

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const output = await this.invoiceRepository.find(input.id);
    return {
      address: output.address,
      createdAt: output.createdAt,
      document: output.document,
      items: output.items.map(item => ({
        name: item.name,
        price: item.price,
        id: item.id.id,
      })),
      id: output.id.id,
      name: output.name,
      total: output.items.reduce((acc, item) => acc + item.price, 0)
    }
  }

}