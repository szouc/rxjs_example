var R = require('ramda')

// Functor
class Container {
  constructor(x) {
    this.$value = x
  }

  static of(x) {
    return new Container(x)
  }

  // (a->b)->Container a->Container b
  map(f) {
    return Container.of(f(this.$value))
  }
}

console.log(
  Container.of(2).map(function(two) {
    return two + 2
  })
)
console.log(
  Container.of('flamethrowers').map(function(s) {
    return s.toUpperCase()
  })
)
console.log(
  Container.of('bombs')
    .map(R.concat('away'))
    .map(R.prop('length'))
)
