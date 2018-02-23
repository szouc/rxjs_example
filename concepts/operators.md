# 1. OPERATORS

<!-- TOC -->

- [1. OPERATORS](#1-operators)
  - [1.1. Combination Operators](#11-combination-operators)
    - [1.1.1. combineLatest](#111-combinelatest)
    - [1.1.2. concat](#112-concat)
    - [1.1.3. merge](#113-merge)
    - [1.1.4. mergeAll](#114-mergeall)
    - [1.1.5. switch](#115-switch)
    - [1.1.6. startWith](#116-startwith)
    - [1.1.7. withLatestFrom](#117-withlatestfrom)
  - [1.2. Transformation Operators](#12-transformation-operators)
    - [1.2.1. bufferTime](#121-buffertime)
    - [1.2.2. concatMap](#122-concatmap)
    - [1.2.3. map](#123-map)
    - [1.2.4. mergeMap](#124-mergemap)
    - [1.2.5. scan](#125-scan)
    - [1.2.6. switchMap](#126-switchmap)
  - [1.3. Filtering Operator](#13-filtering-operator)
    - [1.3.1. debounceTime](#131-debouncetime)
    - [1.3.2. distinctUntilChanged](#132-distinctuntilchanged)
    - [filter](#filter)
    - [take](#take)
    - [takeUntil](#takeuntil)
  - [Utility Operators](#utility-operators)
    - [do](#do)
  - [Error Handling Operators](#error-handling-operators)
    - [catch](#catch)
  - [Multicasting Operators](#multicasting-operators)
    - [share](#share)

<!-- /TOC -->

## 1.1. Combination Operators

### 1.1.1. combineLatest

Combines multiple Observables to create an Observable whose values are calculated from the latest values of each of its input Observables.

```js
public static combineLatest(observable1: ObservableInput, observable2: ObservableInput, project: function, scheduler: Scheduler): Observable
```

![combineLatest](http://reactivex.io/rxjs/img/combineLatest.png)

> Whenever any input Observable emits a value, it computes a formula using the latest values from all the inputs, then emits the output of that formula.

### 1.1.2. concat

Creates an output Observable which **sequentially** emits all values from given Observable and then moves on to the next.

```js
public static concat(input1: ObservableInput, input2: ObservableInput, scheduler: Scheduler): Observable
```

![concat](http://reactivex.io/rxjs/img/concat.png)

> Concatenates multiple Observables together by sequentially emitting their values, one Observable after the other.
>
> **note:** sequentially emits.

### 1.1.3. merge

Creates an output Observable which **concurrently** emits all values from every given input Observable.

```js
public static merge(observables: ...ObservableInput, concurrent: number, scheduler: Scheduler): Observable
```

![merge](http://reactivex.io/rxjs/img/merge.png)

> Flattens multiple Observables together by blending their values into one Observable.
>
> **note:** concurrently emits

### 1.1.4. mergeAll

Converts a higher-order Observable into a first-order Observable which concurrently delivers all values that are emitted on the inner Observables.

```js
public mergeAll(concurrent: number): Observable
```

![mergeAll](http://reactivex.io/rxjs/img/mergeAll.png)

> Flattens an Observable-of-Observables.
>
> **notes** `mergeAll` merge and flatten Observables from the higher-order Observable; `merge` merge values from the Observable

### 1.1.5. switch

Converts a higher-order Observable into a first-order Observable by subscribing to only the most recently emitted of those inner Observables.

```js
public switch(): Observable<T>
```

![switch](http://reactivex.io/rxjs/img/switch.png)

> Flattens an Observable-of-Observables by dropping the previous inner Observable once a new one appears.

### 1.1.6. startWith

Returns an Observable that emits the items you specify as arguments before it begins to emit items emitted by the source Observable.

```js
public startWith(values: ...T, scheduler: Scheduler): Observable
```

![startWith](http://reactivex.io/rxjs/img/startWith.png)

### 1.1.7. withLatestFrom

Combines the source Observable with other Observables to create an Observable whose values are calculated from the latest values of each, only when the source emits.

```js
public withLatestFrom(other: ObservableInput, project: Function): Observable
```

![withLatestFrom](http://reactivex.io/rxjs/img/withLatestFrom.png)

> Whenever the source Observable emits a value, it computes a formula using that value plus the latest values from other input Observables, then emits the output of that formula.

## 1.2. Transformation Operators

### 1.2.1. bufferTime

Buffers the source Observable values for a specific time period.

```js
public bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, maxBufferSize: number, scheduler: Scheduler): Observable<T[]>
```

![bufferTime](http://reactivex.io/rxjs/img/bufferTime.png)

> Collects values from the past as an array, and emits those arrays periodically in time.

### 1.2.2. concatMap

Projects each source value to an Observable which is merged in the output Observable, in a serialized fashion waiting for each one to complete before merging the next.

```js
public concatMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable
```

![concatMap](http://reactivex.io/rxjs/img/concatMap.png)

> Maps each value to an Observable, then flattens all of these inner Observables using concatAll.

### 1.2.3. map

Applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable.

```js
public map(project: function(value: T, index: number): R, thisArg: any): Observable<R>
```

![map](http://reactivex.io/rxjs/img/map.png)

> Like `Array.prototype.map()`, it passes each source value through a transformation function to get corresponding output values.

### 1.2.4. mergeMap

Projects each source value to an Observable which is merged in the output Observable.

```js
public mergeMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any, concurrent: number): Observable
```

![mergeMap](http://reactivex.io/rxjs/img/mergeMap.png)

> Maps each value to an Observable, then flattens all of these inner Observables using mergeAll.

### 1.2.5. scan

Applies an accumulator function over the source Observable, and returns each intermediate result, with an optional seed value.

```js
public scan(accumulator: function(acc: R, value: T, index: number): R, seed: T | R): Observable<R>
```

![scan](http://reactivex.io/rxjs/img/scan.png)

> It's like `reduce`, but emits the current accumulation whenever the source emits a value.

### 1.2.6. switchMap

Projects each source value to an Observable which is merged in the output Observable, emitting values only from the most recently projected Observable.

```js
public switchMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable
```

![switchMap](http://reactivex.io/rxjs/img/switchMap.png)

> Maps each value to an Observable, then flattens all of these inner Observables using switch.

## 1.3. Filtering Operator

### 1.3.1. debounceTime

Emits a value from the source Observable only after a particular time span has passed without another source emission.

```js
public debounceTime(dueTime: number, scheduler: Scheduler): Observable
```
![debounceTime](http://reactivex.io/rxjs/img/debounceTime.png)

> It's like `delay`, but passes only the most recent value from each burst of emissions.

### 1.3.2. distinctUntilChanged

Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.

If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.

If a comparator function is not provided, an equality check is used by default.

```js
public distinctUntilChanged(compare: function): Observable
```

```js
interface Person {
   age: number,
   name: string
}

Observable.of<Person>(
    { age: 4, name: 'Foo'},
    { age: 7, name: 'Bar'},
    { age: 5, name: 'Foo'})
    { age: 6, name: 'Foo'})
    .distinctUntilChanged((p: Person, q: Person) => p.name === q.name)
    .subscribe(x => console.log(x));

// displays:
// { age: 4, name: 'Foo' }
// { age: 7, name: 'Bar' }
// { age: 5, name: 'Foo' }
```

### filter

Filter items emitted by the source Observable by only emitting those that satisfy a specified predicate.

```js
public filter(predicate: function(value: T, index: number): boolean, thisArg: any): Observable
```

![filter](http://reactivex.io/rxjs/img/filter.png)

> Like `Array.prototype.filter()`, it only emits a value from the source if it passes a criterion function.

### take

Emits only the first count values emitted by the source Observable.

```js
public take(count: number): Observable<T>
```

![take](http://reactivex.io/rxjs/img/take.png)

> Takes the first count values from the source, then completes.

### takeUntil

Emits the values emitted by the source Observable until a notifier Observable emits a value.

```js
public takeUntil(notifier: Observable): Observable<T>
```

![takeUntil](http://reactivex.io/rxjs/img/takeUntil.png)

> Lets values pass until a second Observable, notifier, emits something. Then, it completes.

## Utility Operators

### do

Perform a side effect for every emission on the source Observable, but return an Observable that is identical to the source.

```js
public do(nextOrObserver: Observer | function, error: function, complete: function): Observable
```

![do](http://reactivex.io/rxjs/img/do.png)

> Intercepts each emission on the source and runs a function, but returns an output which is identical to the source as long as errors don't occur.

## Error Handling Operators

### catch

Catches errors on the observable to be handed by returning a new observable or throwing an error.

```js
public catch(selector: function): Observable
```

![catch](http://reactivex.io/rxjs/img/catch.png)

## Multicasting Operators

### share

Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream hot.

This behaves similarly to .publish().refCount(), with a behavior difference when the source observable emits complete. .publish().refCount() will not resubscribe to the original source, however .share() will resubscribe to the original source. Observable.of("test").publish().refCount() will not re-emit "test" on new subscriptions, Observable.of("test").share() will re-emit "test" to new subscriptions.

```js
public share(): Observable<T>
```

![share](http://reactivex.io/rxjs/img/share.png)
