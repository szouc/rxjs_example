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

function giveMeSomeData(ob) {
  [10, 20, 30].forEach(ob.next)
}

giveMeSomeData(observer)
