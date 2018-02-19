const readable = getReadableStreamSomehow()

function nextDataCallback (chunk) {
  console.log(`Received ${chunk.length} bytes of data`)
}

function errorCallback (err) {
  console.error(`Bad stuff happened: ${err}.`)
}

function doneCallback () {
  console.log(`There will be no more data.`)
}

readable.on('data', nextDataCallback)
readable.on('error', errorCallback)
readable.on('end', doneCallback)