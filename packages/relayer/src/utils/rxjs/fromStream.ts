import { Observable, Observer } from 'rxjs'

export function fromStream<T> (stream: NodeJS.ReadableStream, dataEventName: string = 'data', finishEventName: string = 'end'): Observable<T> {
  stream.pause()

  return Observable.create((observer: Observer<T>) => {

    const data$ = Observable.fromEvent(stream, dataEventName)

    const error$ = Observable.fromEvent(stream, 'error')
      .flatMap(err => Observable.throw(err))

    const complete$ = Observable.fromEvent(stream, finishEventName)
      .do(_ => console.log('Stream ended!'))

    const sub = data$
      .merge(error$)
      .takeUntil(complete$)
      .subscribe(observer)

    stream.resume()

    return sub
  })
    .share()
}

export function resilientFromStream<T> (streamInitiator: () => NodeJS.ReadableStream, dataEventName: string = 'data', finishEventName: string = 'end'): Observable<T> {
  console.log('Starting resilient stream...')

  return Observable.create((observer: Observer<T>) => {
    const subscribeToStream = () => {
      console.log('Connecting to stream')

      return fromStream<T>(streamInitiator(), dataEventName, finishEventName)
        .subscribe(
          event => observer.next(event),
          error => observer.error(error),
          () => {
            console.log('Stream disconnected, reconnecting...')
            subscribeToStream()
          }
        )
    }

    subscribeToStream()
  })
    .share()
}
