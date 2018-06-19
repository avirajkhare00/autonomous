// tslint:disable member-ordering
/**
 * IPFS Declarations
 * Taken from:
 * https://github.com/survirtual/types-ipfs/blob/master/index.d.ts
 * https://github.com/ipfs/js-ipfs-api
 *
 * Files
 *
 * files
 * ipfs.files.add(data, [options], [callback]). Alias to ipfs.add.
 * ipfs.files.addPullStream([options])
 * ipfs.files.addReadableStream([options])
 * ipfs.files.cat(ipfsPath, [options], [callback]). Alias to ipfs.cat.
 * ipfs.files.catPullStream(ipfsPath, [options])
 * ipfs.files.catReadableStream(ipfsPath, [options])
 * ipfs.files.get(ipfsPath, [options], [callback]). Alias to ipfs.get.
 * ipfs.files.getPullStream(ipfsPath, [options])
 * ipfs.files.getReadableStream(ipfsPath, [options])
 * ipfs.ls(ipfsPath, [callback])
 * ipfs.lsPullStream(ipfsPath)
 * ipfs.lsReadableStream(ipfsPath)
 *
 * MFS (mutable file system) specific
 *
 * ipfs.files.cp([from, to], [callback])
 * ipfs.files.flush([path], [callback])
 * ipfs.files.ls([path], [options], [callback])
 * ipfs.files.mkdir(path, [options], [callback])
 * ipfs.files.mv([from, to], [callback])
 * ipfs.files.read(path, [options], [callback])
 * ipfs.files.readPullStream(path, [options])
 * ipfs.files.readReadableStream(path, [options])
 * ipfs.files.rm(path, [options], [callback])
 * ipfs.files.stat(path, [options], [callback])
 * ipfs.files.write(path, content, [options], [callback])
 *
 * block
 * ipfs.block.get(cid, [options], [callback])
 * ipfs.block.put(block, [options], [callback])
 * ipfs.block.stat(cid, [callback])
 *
 * Graph
 *
 * dag
 * ipfs.dag.get(cid, [path], [options], [callback])
 * ipfs.dag.put(dagNode, [options], [callback])
 * ipfs.dag.tree(cid, [path], [options], [callback])
 *
 * object
 * ipfs.object.data(multihash, [options], [callback])
 * ipfs.object.get(multihash, [options], [callback])
 * ipfs.object.links(multihash, [options], [callback])
 * ipfs.object.new([template], [callback])
 * ipfs.object.patch.addLink(multihash, DAGLink, [options], [callback])
 * ipfs.object.patch.appendData(multihash, data, [options], [callback])
 * ipfs.object.patch.rmLink(multihash, DAGLink, [options], [callback])
 * ipfs.object.patch.setData(multihash, data, [options], [callback])
 * ipfs.object.put(obj, [options], [callback])
 * ipfs.object.stat(multihash, [options], [callback])
 *
 * pin
 * ipfs.pin.add(hash, [options], [callback])
 * ipfs.pin.ls([hash], [options], [callback])
 * ipfs.pin.rm(hash, [options], [callback])
 *
 * refs
 * ipfs.refs.local()
 *
 * Network
 *
 * bootstrap
 * ipfs.bootstrap.add(addr, [options], [callback])
 * ipfs.bootstrap.list([callback])
 * ipfs.bootstrap.rm(addr, [options], [callback])
 *
 * bitswap
 * ipfs.bitswap.stat([callback])
 * ipfs.bitswap.wantlist([peerId])
 * ipfs.bitswap.unwant(cid)
 *
 * dht
 * ipfs.dht.findpeer(peerId, [callback])
 * ipfs.dht.findprovs(hash, [callback])
 * ipfs.dht.get(key, [callback])
 * ipfs.dht.provide(cid, [callback])
 * ipfs.dht.put(key, value, [callback])
 *
 * pubsub
 * ipfs.pubsub.ls(topic, [callback])
 * ipfs.pubsub.peers(topic, [callback])
 * ipfs.pubsub.publish(topic, data, [callback])
 * ipfs.pubsub.subscribe(topic, handler, [options], [callback])
 * ipfs.pubsub.unsubscribe(topic, handler, [callback])
 *
 * swarm
 * ipfs.swarm.addrs([callback])
 * ipfs.swarm.connect(addr, [callback])
 * ipfs.swarm.disconnect(addr, [callback])
 * ipfs.swarm.peers([options], [callback])
 *
 * name
 * ipfs.name.publish(addr, [options], [callback])
 * ipfs.name.resolve(addr, [options], [callback])
 *
 * Node Management
 *
 * miscellaneous operations
 * ipfs.dns(domain, [callback])
 * ipfs.id([callback])
 * ipfs.ping(id, [options], [callback])
 * ipfs.pingPullStream(id, [options])
 * ipfs.pingReadableStream(id, [options])
 * ipfs.stop([callback]). Alias to ipfs.shutdown.
 * ipfs.version([callback])
 *
 * config
 * ipfs.config.get([key], [callback])
 * ipfs.config.replace(config, [callback])
 * ipfs.config.set(key, value, [callback])
 *
 * stats
 * ipfs.stats.bitswap([callback])
 * ipfs.stats.bw([options], [callback])
 * ipfs.stats.bwPullStream([options])
 * ipfs.stats.bwReadableStream([options])
 * ipfs.stats.repo([options], [callback])
 *
 * log
 * ipfs.log.level(subsystem, level, [options], [callback])
 * ipfs.log.ls([callback])
 * ipfs.log.tail([callback])
 *
 * repo
 * ipfs.repo.gc([options], [callback])
 * ipfs.repo.stat([options], [callback])
 * ipfs.repo.version([callback])
 *
 * key
 * ipfs.key.export(name, password, [callback])
 * ipfs.key.gen(name, [options], [callback])
 * ipfs.key.import(name, pem, password, [callback])
 * ipfs.key.list([options, callback])
 * ipfs.key.rename(oldName, newName, [callback])
 * ipfs.key.rm(name, [callback])
 *
 * Types
 *
 * types
 * ipfs.types.Buffer
 * ipfs.types.PeerId
 * ipfs.types.PeerInfo
 * ipfs.types.multiaddr
 * ipfs.types.multibase
 * ipfs.types.multihash
 * ipfs.types.CID
 * ipfs.types.dagPB
 * ipfs.types.dagCBOR
 *
 */

declare module 'ipfs-api' {
  export class IPFSAPI {
    // Types
    types: IPFS.Types

    // Files
    files: IPFS.FilesAPI
    block: any

    // Graph
    dag: IPFS.DagAPI
    object: IPFS.ObjectAPI
    pin: any
    refs: any

    // Network
    bootstrap: any
    bitswap: any
    dht: any
    pubsub: any
    swarm: IPFS.SwarmAPI
    name: IPFS.NameAPI

    // Node management
    config: any
    stats: any
    log: any
    repo: IPFS.RepoAPI
    key: IPFS.KeyAPI

    dns (domain: any): Promise<any>

    id (): Promise<IPFS.Id>

    ping (): Promise<void>

    pingFullStream (id: string, options?: any): Promise<void>

    pingReadableStream (id: string, options?: any): Promise<void>

    stop (): Promise<void>

    version (): Promise<IPFS.Version>
  }

  export namespace IPFS {
    export interface APIOptions {
      host: string,
      port: string,
      protocol: string,
      'api-path': string
    }

    export interface Multiaddr {
      buffer: Uint8Array
    }

    export type Multihash = any | string
    export type CID = any

    export interface Types {
      Buffer: any
      PeerId: any
      PeerInfo: any
      multiaddr: Multiaddr
      multibase: any
      multihash: Multihash
      CID: CID
      dagPb: any
      dagCBOR: any
    }

    export interface Version {
      version: string
      repo: string
      commit: string
    }

    export interface Id {
      id: string
      publicKey: string
      addresses: Multiaddr[]
      agentVersion: string
      protocolVersion: string
    }

    export interface RepoAPI {
      gc (options?: any): Promise<void>
      stat (options?: any): Promise<void>
      version (): Promise<void>
    }

    export type FileContent = Object | Blob | string

    export interface IPFSFile {
      path: string
      hash: string
      size: number
      content?: FileContent
    }

    export interface FilesAPI {
      add (data: FileContent, options?: any): Promise<IPFSFile[]>
      cat (ipfsPath: Multihash, options?: any): Promise<FileContent>
      get (ipfsPath: Multihash, options?: any): Promise<IPFSFile[]>
      ls (ipfsPath: Multihash): Promise<any>
    }

    export interface PeersOptions {
      v?: boolean
      verbose?: boolean
    }

    export type PeerId = any

    export interface PeerInfo {
      id: PeerId
      multiaddr: Multiaddr
      multiaddrs: Multiaddr[]
      distinctMultiaddr (): Multiaddr[]
    }

    export interface Peer {
      addr: Multiaddr
      peer: PeerInfo
    }

    export interface SwarmAPI {
      peers (options?: PeersOptions): Promise<Peer[]>
      addrs (): Promise<PeerInfo[]>
      localAddrs (): Promise<Multiaddr[]>
      connect (maddr: Multiaddr | string): Promise<any>
      disconnect (maddr: Multiaddr | string): Promise<any>
      filters (): Promise<never>
    }

    export interface NamePublishOptions {
      resolve: boolean // bool - Resolve given path before publishing. Default: true
      lifetime: string // string - Time duration of the record. Default: 24h
      ttl: string      // string - Time duration this record should be cached
      key: string      // string - Name of the key to be used or Peer ID. Default: 'self'
    }

    export interface NamePublishResult {
      name: string     // /ipns/QmHash..
      value: string    // /ipfs/QmHash..
    }

    export interface NameResolveOptions {
      recursive: boolean  // bool - Resolve until the result is not an IPNS name. Default: false.
      nocache: boolean    // bool - Do not use cached entries. Default: false.
    }

    export interface NameAPI {
      publish (address: string | CID, options?: Partial<NamePublishOptions>): Promise<NamePublishResult>
      resolve (address: string | CID, options?: Partial<NameResolveOptions>): Promise<string>
    }

    export type DAGNode = any
    export type DAGLink = any
    export type DAGLinkRef = DAGLink | any
    export type Obj = BufferSource | Object

    export interface ObjectStat {
      Hash: Multihash
      NumLinks: number
      BlockSize: number
      LinksSize: number
      DataSize: number
      CumulativeSize: number
    }

    export interface PutObjectOptions {
      enc?: any
    }

    export interface GetObjectOptions {
      enc?: any
    }

    export interface ObjectAPI {
      data (multihash: Multihash, options?: GetObjectOptions): Promise<any>
      get (multihash: Multihash, options?: GetObjectOptions): Promise<any>
      links (multihash: Multihash, options?: GetObjectOptions): Promise<DAGLink[]>
      'new' (template?: 'unixfs-dir'): Promise<void>
      patch: ObjectPatchAPI
      put (obj: Obj, options?: PutObjectOptions): Promise<any>
      stat (multihash: Multihash, options?: GetObjectOptions): Promise<ObjectStat>
    }

    export interface ObjectPatchAPI {
      addLink (multihash: Multihash, link: DAGLink, options?: GetObjectOptions): Promise<any>
      appendData (multihash: Multihash, data: any, options?: GetObjectOptions): Promise<any>
      rmLink (multihash: Multihash, linkRef: DAGLinkRef, options?: GetObjectOptions): Promise<any>
      setData (multihash: Multihash, data: any, options?: GetObjectOptions): Promise<any>
    }

    export interface DagAPI {
      get (cid: string | CID, path?: string, options?: any): Promise<any>
      put (dagNode: any, options?: any): Promise<any>
      tree (cid: string | CID, path?: string, options?: any): Promise<any>
    }

    export interface KeyGenOptions {
      type: 'rsa',
      size: number | 2048
    }

    export interface KeyResult {
      id: string,   // string - the hash of the key
      name: string  // string - the name of the key
    }

    export type KeyListResult = KeyResult[]

    export interface KeyAPI {
      gen (name: string, options?: KeyGenOptions): Promise<KeyResult>
      list (): Promise<KeyListResult>
      rename (oldName: string, newName: string): Promise<any>
      rm (name: string): Promise<any>
    }
  }

  function APIConstructor (
    hostOrMultiaddrOrOpts: string | Partial<IPFS.APIOptions>,
    portOrOpts?: string | number | Partial<IPFS.APIOptions>,
    opts?: Partial<IPFS.APIOptions>
  ): IPFSAPI

  export default APIConstructor
}
