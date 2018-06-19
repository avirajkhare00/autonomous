import { default as IPFSFactory, IPFSDaemon } from 'ipfsd-ctl'
import * as util from 'util'

export class IPFSController {
  private ipfsFactory = IPFSFactory.create({
    type: 'go'
  })

  private ipfsDaemon: IPFSDaemon

  constructor (private config: any) {}

  async start (): Promise<IPFSDaemon> {
    return new Promise<IPFSDaemon>((res, rej) => {
      this.ipfsFactory.spawn(
        this.config,
        (err: Error, ipfsd: IPFSDaemon) => {
          if (err) rej(err)
          res(ipfsd)
        }
      )
    })
  }

  stop (): Promise<void> {
    return util.promisify(this.ipfsDaemon.stop)()
  }

}
