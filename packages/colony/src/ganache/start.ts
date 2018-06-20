import { GanacheHarness } from './GanacheHarness'
import { getTestWeb3Config } from '../config'

let web3Config = getTestWeb3Config()

let ganache = new GanacheHarness(web3Config)

ganache.setup()
