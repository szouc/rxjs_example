// Container
class Container {
  constructor(x) {
    this.$value = x
  }

  static of(x) {
    return new Container(x)
  }
}

console.log(Container.of(2))
