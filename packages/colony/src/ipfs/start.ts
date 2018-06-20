import { getTestIPFSConfig } from '../config'
import { IPFSHarness } from './IPFSHarness'

let ipfsConfig = getTestIPFSConfig()
let ipfs = new IPFSHarness(ipfsConfig)

ipfs.setup()
