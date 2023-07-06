import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice-facade.interface";

interface InvoiceFacadeProps { generateInvoiceUseCase: GenerateInvoiceUseCase, findInvoiceUseCase: FindInvoiceUseCase }

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private generateInvoiceUseCase;
  private findInvoiceUseCase;
  constructor({ generateInvoiceUseCase, findInvoiceUseCase }: InvoiceFacadeProps) {
    this.findInvoiceUseCase = findInvoiceUseCase;
    this.generateInvoiceUseCase = generateInvoiceUseCase;
  }

  async generate(invoice: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    const output = await this.generateInvoiceUseCase.execute(invoice);
    return output;
  }
  async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
    const output = await this.findInvoiceUseCase.execute(input);
    return output;
  }

}