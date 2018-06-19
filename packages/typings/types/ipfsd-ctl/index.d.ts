// https://github.com/ipfs/js-ipfsd-ctl
declare module 'ipfsd-ctl' {
  import { IPFSAPI } from 'ipfs-api'

  type ErrorCallback = (err: Error | null) => void
  type Callback<T> = (err: Error | null, result: T) => void

  export function create (options?: Partial<IPFSFactoryOptions>): IPFSSpawner

  export function createServer (options?: Partial<IPFSFactoryOptions>): IPFSServer

  type IPFSTypes = 'go' | 'js' | 'proc'

  type VersionResponse<T> =
    T extends 'go' ? string
      : T extends 'js' ? string
      : T extends 'proc' ? { version: string, repo: string, commit: string }
      : any

  export interface IPFSFactoryOptions {
    remote: boolean
    port: number
    exec: string
    type: IPFSTypes
  }

  // TODO Confirm these types are correct, the docs are awful
  export interface IPFSServer {
    start (callback: ErrorCallback): void
    stop (callback: ErrorCallback): void
  }

  export interface IPFSSpawner {
    spawn (options: Partial<IPFSSpawnOptions>, callback: Callback<IPFSDaemon>): void
    version (callback: Callback<VersionResponse<IPFSTypes>>): void
  }

  export interface IPFSSpawnOptions {
    init: boolean
    initOptions: { bits: number }
    start: boolean
    repoPath: string
    disposable: boolean
    defaultAddrs: boolean
    args: string[]
    config: any
  }

  export interface IPFSDaemon {
    apiAddr: any
    gatewayAddr: any
    repoPath: string
    started: boolean,
    api: IPFSAPI
    init (initOptions: any, callback: Callback<IPFSDaemon>): void
    cleanup (callback: ErrorCallback): void
    start (flags: string[], callback: Callback<IPFSAPI>): void
    stop (callback?: ErrorCallback): void
    killProcess (callback?: () => void): void
    pid (callback: Callback<string>): void
    getConfig (callback: Callback<Object | string>): void
    getConfig (key: string, callback: Callback<Object | string>): void
    setConfig (key: string, value: any, callback: (err: Error) => void): void
    version (callback: Callback<string>): void
  }
}
