import { observableFetch } from './rxjs'

export function get (url: string) {
  return observableFetch(url, {
    method: 'GET'
  })
}

export function post (url: string, data: Object) {
  return observableFetch(url, {
    body: JSON.stringify(data),
    method: 'POST'
  })
}
