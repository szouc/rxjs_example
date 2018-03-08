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

// Example
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

// Example
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

// maybe
// maybe :: b -> (a -> b) -> Maybe a -> b
const maybe = R.curry((v, f, m) => {
  if (m.isNothing) {
    return v
  }
  return f(m.$value)
})

// Example
// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = R.curry((amount, { balance }) =>
  Maybe.of(balance >= amount ? { balance: balance - amount } : null)
)
// This function is hypothetical, not implemented here... nor anywhere else.
// updateLedger :: Account -> Account
const updateLedger = account => account
// remainingBalance :: Account -> String
const remainingBalance = ({ balance }) => `Your balance is $${balance}`
// finishTransaction :: Account -> String
const finishTransaction = R.compose(remainingBalance, updateLedger)
// getTwenty :: Account -> String
const getTwenty = R.compose(
  maybe("You're broke!", finishTransaction),
  withdraw(20)
)
console.log(getTwenty({ balance: 200.0 }))
// 'Your balance is $180.00'
console.log(getTwenty({ balance: 10.0 }))
// 'You\'re broke!'
