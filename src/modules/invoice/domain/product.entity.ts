import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
  id?: Id,
  name: string,
  price: number,
}

export default class Product extends BaseEntity {

  private _props;
  constructor(props: ProductProps) {
    super(props.id);
    this._props = props;
  }

  get name() {
    return this._props.name;
  }

  get price() {
    return this._props.price;
  }


  set name(name: string) {
    this._props.name = name;
  }

  set price(price: number) {
    this._props.price = price;
  }

}