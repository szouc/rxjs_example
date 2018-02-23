function map(transformFn) {
  const inputObservable = this
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function(x) {
        const y = transformFn(x)
        outputObserver.next(y)
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    })
  })
  return outputObservable
}

function filter(conditionFn) {
  const inputObservable = this
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function(x) {
        if (conditionFn(x)) {
          outputObserver.next(x)
        }
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    })
  })
  return outputObservable
}

function delay(period) {
  const inputObservable = this
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function(x) {
        setTimeout(() => {
          outputObserver.next(x)
        }, period)
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    })
  })
  return outputObservable
}

function createObservable(subscribe) {
  return {
    subscribe: subscribe,
    map: map,
    filter: filter,
    delay: delay
  }
}

const clickObservable = createObservable(function subscribe(ob) {
  document.addEventListener('click', ob.next)
})

const arrayObservable = createObservable(function subscribe(ob) {
  [10, 20, 30].forEach(ob.next)
  ob.complete()
  ob.next(40)
})

function createSafeObserver(ob) {
  let isUnsubscribed
  return {
    next: function next(data) {
      if (ob.next && !isUnsubscribed) {
        ob.next && ob.next(data)
      }
    },
    error: function error(err) {
      if (!isUnsubscribed) {
        if (ob.error) {
          ob.error(err)
        }
        isUnsubscribed = true
      }
    },
    complete: function complete() {
      if (!isUnsubscribed) {
        if (ob.complete) {
          ob.complete()
        }
        isUnsubscribed = true
      }
    }
  }
}

const observer = createSafeObserver({
  next: function nextCallback(data) {
    console.log(data)
  },
  error: function errorCallback(err) {
    console.error(err)
  },
  complete: function completeCallback(data) {
    console.log('done')
  }
})

arrayObservable
  .map(x => x/10)
  .filter(x => x != 2)
  .subscribe(observer)