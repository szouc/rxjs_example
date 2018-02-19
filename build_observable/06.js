function nextCallback(data) {
  console.log(data)
}

function errorCallback(err) {
  console.error(err)
}

function completeCallback(data) {
}

function giveMeSomeData (nextCB, errorCB, completeCB) {
  fetch(url).then(nextCB, errorCB)
}

giveMeSomeData(
  nextCallback,
  errorCallback,
  completeCallback
)
