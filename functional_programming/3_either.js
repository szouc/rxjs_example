var R = require('ramda')
const moment = require('moment')

// EITHER
class Either {
  static of(x) {
    return new Right(x)
  }
  constructor(x) {
    this.$value = x
  }
}

class Left extends Either {
  map(f) {
    return this
  }
  release() {
    return `Left(${this.$value})`
  }
}

class Right extends Either {
  map(f) {
    return Either.of(f(this.$value))
  }
  release() {
    return `Right(${this.$value})`
  }
}
const left = x => new Left(x)

// pointfree
// map:: Functor f => (a->b)->fa->fb
var map = R.curry(function(f, anyFunctor) {
  return anyFunctor.map(f)
})

// Example
console.log(Either.of('rain').map(str => `b${str}`))
// Right('brain')
console.log(
  left('rain').map(str => `It's gonna ${str}, better bring your umbrella!`)
)
// Left('rain')
console.log(Either.of({ host: 'localhost', port: 80 }).map(R.prop('host')))
// Right('localhost')
console.log(left('rolls eyes...').map(R.prop('host')))
// Left('rolls eyes...')

// getAge :: Date -> User -> Either(String, Number)
const getAge = R.curry((now, user) => {
  const birthDate = moment(user.birthDate, 'YYYY-MM-DD')
  return birthDate.isValid()
    ? Either.of(now.diff(birthDate, 'years'))
    : left('Birth date could not be parsed')
})
getAge(moment(), { birthDate: '2005-12-12' })
// Right(9)
getAge(moment(), { birthDate: 'July 4, 2001' })
// Left('Birth date could not be parsed')
// fortune :: Number -> String
const fortune = R.compose(
  R.concat('If you survive, you will be '),
  R.toString,
  R.add(1)
)
// zoltar :: User -> Either(String, _)
const zoltar = R.compose(map(console.log), map(fortune), getAge(moment()))
console.log(zoltar({ birthDate: '2005-12-12' }))
// 'If you survive, you will be 10'
// Right(undefined)
console.log(zoltar({ birthDate: 'balloons!' }))
// Left('Birth date could not be parsed')

// pointfree
// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = R.curry((f, g, e) => {
  let result
  switch (e.constructor) {
    case Left:
      result = f(e.$value)
      break
    case Right:
      result = g(e.$value)
      break
    // No Default
  }
  return result
})

const id = x => x

// Example
// zoltar :: User -> _
const zoltar1 = R.compose(console.log, either(id, fortune), getAge(moment()))
console.log(zoltar1({ birthDate: '2005-12-12' }))
// 'If you survive, you will be 10'
// undefined
console.log(zoltar1({ birthDate: 'balloons!' }))
// 'Birth date could not be parsed'
// undefined
