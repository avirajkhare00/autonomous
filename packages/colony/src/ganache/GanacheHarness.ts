import Web3 from 'web3'
import ganache from 'ganache-core'

import { GanacheController, GanacheControllerOptions } from './GanacheController'
import { ServiceHarness } from '../serviceHarness'
import { Web3Config } from '@autonomous/colony'

export class GanacheHarness implements ServiceHarness<Web3> {
  ganacheController: GanacheController

  constructor(private config: Web3Config) {}

  async setup (): Promise<Web3> {

    let testrpcOptions: Partial<GanacheControllerOptions> = {
      hostname: this.config.hostname,
      port: this.config.port,
      network_id: 1337,
      mnemonic: this.config.hostname,
      gasLimit: 8000000
    }

    this.ganacheController = new GanacheController(testrpcOptions)

    await this.ganacheController.start()

    let web3 = new Web3()
    web3.setProvider(ganache.provider(testrpcOptions))

    return web3
  }

  async destroy (): Promise<void> {
    if (this.ganacheController) {
      await this.ganacheController.stop()
    }
  }
}
