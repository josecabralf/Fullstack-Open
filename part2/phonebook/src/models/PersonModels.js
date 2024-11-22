export class PersonModel {
  constructor(id, name, number) {
    this.id = id
    this.name = name
    this.number = number
  }

  toString = () =>  `${this.name}: ${this.number}`;
}