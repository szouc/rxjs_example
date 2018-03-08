const R = require('ramda')

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

class IO {
  static of(x) {
    return new IO(() => x)
  }
  constructor(fn) {
    this.$value = fn
  }
  map(fn) {
    return new IO(R.compose(fn, this.$value))
  }
  release() {
    return `IO(${this.$value})`
  }
}

// Example
// map:: Functor f => (a->b)->fa->fb
var map = R.curry(function(f, anyFunctor) {
  return anyFunctor.map(f)
})
// url :: IO String
const url = new IO(() => 'http://localhost/user?name=sz&pass=123456')
// toPairs :: String -> [[String]]
const toPairs = R.compose(map(R.split('=')), R.split('&'))
// params :: String -> [[String]]
const params = R.compose(toPairs, R.last, R.split('?'))
// findParam :: String -> IO Maybe [String]
const findParam = key =>
  map(
    R.compose(Maybe.of, R.filter(R.compose(R.equals(key), R.head)), params),
    url
  )
// -- Impure calling code ----------------------------------------------
// run it by calling $value()!
console.log(findParam('name').$value())
