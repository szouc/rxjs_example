function nextCallback(data) {
  console.log(data)
}

function errorCallback(data) {
}

function completeCallback(data) {
}

function giveMeSomeData (nextCB, errorCB, completeCB) {
  document.addEventListener('click', nextCB)
}

giveMeSomeData(
  nextCallback,
  errorCallback,
  completeCallback
)
