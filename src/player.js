export default class Player {
  constructor (name) {
    this.name = name;
  }

  toJSON () {
    return {
      name: this.name
    }
  }
}