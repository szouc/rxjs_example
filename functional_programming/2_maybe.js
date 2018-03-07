var R = require('ramda')

// Maybe
class Maybe {
  constructor(x) {
    this.$value = x
  }
  static of(x) {
    return new Maybe(x)
  }
  get isNothing() {
    return this.$value === null || this.$value === undefined
  }
  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value))
  }
  release() {
    return this.isNothing ? 'Nothing' : `Just (${this.$value})`
  }
}

console.log(Maybe.of('Malkovich Malkovich').map(R.match(/a/gi)))
console.log(Maybe.of(null).map(R.match(/a/gi)))
console.log(
  Maybe.of({ name: 'Boris' })
    .map(R.prop('age'))
    .map(R.add(10))
)
console.log(
  Maybe.of({ name: 'Dinah', age: 14 })
    .map(R.prop('age'))
    .map(R.add(10))
)

// pointfree
// map:: Functor f => (a->b)->fa->fb
var map = R.curry(function(f, anyFunctor) {
  return anyFunctor.map(f)
})

const safeHead = xs => Maybe.of(xs[0])
// streetName::Object->MaybeString
const streetName = R.compose(
  map(R.prop('street')),
  safeHead,
  R.prop('addresses')
)
console.log(streetName({ addresses: [] }).release())
console.log(
  streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] }).release()
)
