import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "./address.value-object";
import Product from "./product.entity";

type InvoiceProps = {
  id?: Id,
  name: string
  document: string,
  address: Address,
  items: Product[]
  createdAt?: Date
  updatedAt?: Date
}

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _props;

  constructor(props: InvoiceProps) {
    super(props.id);
    this._props = props;
  }

  get document() {
    return this._props.document;
  }

  get address() {
    return this._props.address;
  }

  get name() {
    return this._props.name;
  }

  get items() {
    return this._props.items;
  }

  get total() {
    return this._props.items.reduce((acc, item) => acc + item.price, 0)
  }

}