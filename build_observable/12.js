const clickObservable = {
  subscribe: function subscribe(ob) {
    document.addEventListener('click', ob.next)
  }
}

const arrayObservable = {
  subscribe: function subscribe(ob) {
    [10, 20, 30].forEach(ob.next)
    ob.complete()
  }
}

const observer = {
  next: function nextCallback(data) {
    console.log(data)
  },
  error: function errorCallback(err) {
    console.error(err)
  },
  complete: function completeCallback(data) {
    console.log('done')
  }
}

arrayObservable.subscribe(observer)
