import { Observable } from 'rxjs/Observable'

const REQUEST_TIMEOUT_MILLISECONDS = 5000

export function observableFetch (input?: Request | string, init?: RequestInit): Observable<Response> {
  return Observable.fromPromise(fetch(input, init))
    .flatMap(res => {
      if (!res.ok) {
        return Observable.fromPromise(res.json())
          .map(obj => {
            console.log('Error', res, obj)
            throw Observable.throw(obj)
          })
      } else {
        return Observable.of(res)
      }
    })
    .timeout(REQUEST_TIMEOUT_MILLISECONDS)
}
