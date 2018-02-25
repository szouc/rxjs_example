class Observable {
  constructor(observableFn) {
    this.subscribe = observableFn
  }

  map(mapFn) {
    return new Observable(OutObserver => {
      return this.subscribe({
        next: data => {
          OutObserver.next(mapFn(data))
        },
        error(err) {
          OutObserver.error(err)
        },
        complete() {
          OutObserver.complete()
        }
      })
    })
  }
}

const myObservable = new Observable(observer => {
  let i = 0
  const id = setInterval(() => {
    observer.next(i++) // next 方法
    if (i === 10) observer.complete() // complete 方法
  }, 200)
  return () => clearInterval(id) // 用于终止订阅
})

// const source = operator(myObservable, x => x + '!')
const source = myObservable.map(x => x + '!').map(x => x + '?')

const teardown = source.subscribe({
  next(data) {
    console.log(data)
  },
  error(err) {
    consol.log(err)
  },
  complete() {
    console.log('done')
  }
})

// 4 秒后取消订阅
setTimeout(() => {
  teardown()
}, 4000)
