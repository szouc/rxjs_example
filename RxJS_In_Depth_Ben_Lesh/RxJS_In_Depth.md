# RxJs In-Depth - Ben Lesh

## Differences between Promise and Observable

Both Promises and Observables are built to solve problems around async.

### Promises

* Read-only view to a single future value
* Success and error semantics via.then()
* Not lazy. By the time you have a promise, it's on its way to being resolved.
* Immutable and uncancellable. Your promise will resolve or reject, and only once.

### Observable

* "Streams" or sets
* Of any number of things
* Over any amount of time
* Lazy. Observables will not generate values via an underlying producer until they're subscribed to.
* Can be "unsubscribed" from. This means the underlying producer can be told to stop and even tear down.

## "hot" vs "cold" observables

* Observables are "cold" by default
* "Cold" observables create a new producer each time a consumer subscribes to them.
* "Hot" observables share a single producer with every consumer that subscribes to them.
