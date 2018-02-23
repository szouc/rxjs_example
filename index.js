import { interval } from 'rxjs/observable/interval'
import { map, mergeAll } from 'rxjs/operators'

var clicks = interval(5000)
var higherOrder = clicks.pipe(map(ev => interval(1000)))
var switched = higherOrder.pipe(mergeAll())
switched.subscribe(x => console.log(x))
