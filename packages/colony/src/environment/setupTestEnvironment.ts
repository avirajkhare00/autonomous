///<reference path="../../../../node_modules/@types/node/index.d.ts"/>
import { exec, spawn } from 'child_process'
import { ContractServer } from '../contract-server/ContractServer'

export async function serveTestEnvironment () {
  // let ipfs = new IPFSHarness(ipfsConfig)
  // let ganache = new GanacheHarness(web3Config)
  let contractServer = new ContractServer('build/contracts')

  console.log('Starting Ganache...')
  startProcess('./start.ts', 'WEB3')
  // await ganache.setup()

  console.log('Starting IPFS...')
  startProcess('./start.ts', 'WEB3')
  // await ipfs.setup()

  console.log('Compiling Colony contracts...')
  await new Promise((res, rej) => {
    exec('truffle compile', (err, stdout, _stderr) => {
      if (err) rej(err)
      else res(stdout)
    })
  })

  // NOTE: Cannot serve until contract building is complete
  console.log('Starting contract server...')
  await contractServer.start()
}

const startProcess = (filename: string, label: string) => {
  let process = spawn('ts-node', [filename])

  process.stdout.on('data', function (data) {
    console.log(`[${label}] ${data.toString()}`)
  })

  process.stderr.on('data', function (err) {
    console.log(`[ERROR] [${label}] ${err}`)
  })

  process.on('exit', function () {
    console.log(`[${label}] TERMINATED`)
  })

}
