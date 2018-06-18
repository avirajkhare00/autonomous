import 'rxjs/add/observable/combineLatest'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/bindNodeCallback'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/timeout'
import 'rxjs/add/operator/delay'

import { Observable, Observer } from 'rxjs'

export function fromStream<T> (stream: NodeJS.ReadableStream, dataEventName: string = 'dat', finishEventName: string = 'end'): Observable<T> {
  stream.pause()

  return Observable.create((observer: Observer<T>) => {

    const data$ = Observable.fromEvent(stream, dataEventName)

    const error$ = Observable.fromEvent(stream, 'error')
      .flatMap(err => Observable.throw(err))

    const complete$ = Observable.fromEvent(stream, finishEventName)

    const sub = data$
      .merge(error$)
      .takeUntil(complete$)
      .subscribe(observer)

    stream.resume()

    return sub
  })
    .share()
}
