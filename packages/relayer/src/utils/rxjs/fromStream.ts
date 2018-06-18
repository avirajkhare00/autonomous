import { Observable, Observer } from 'rxjs'

export function fromStream<T> (stream: NodeJS.ReadableStream, dataEventName: string = 'data', finishEventName: string = 'end'): Observable<T> {
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
