import ValueObject from "../../@shared/domain/value-object/value-object.interface";

type AddressProps = {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
}

export default class Address implements ValueObject {
  private _props;
  constructor(props: AddressProps) {
    this._props = props;
  }

  get street() {
    return this._props.street
  }

  get number() {
    return this._props.number;
  }

  get complement() {
    return this._props.complement;
  }

  get city() {
    return this._props.city;
  }

  get state() {
    return this._props.state;
  }

  get zipCode() {
    return this._props.zipCode;
  }


  set street(street: string) {
    this._props.street = street
  }

  set number(number: string) {
    this._props.number = number;
  }

  set complement(complement: string) {
    this._props.complement = complement;
  }

  set city(city: string) {
    this._props.city = city;
  }

  set state(state: string) {
    this._props.state = state;
  }

  set zipCode(zipCode: string) {
    this._props.zipCode = zipCode;
  }
}