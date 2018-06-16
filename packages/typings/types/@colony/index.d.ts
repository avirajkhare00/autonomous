declare module '@colony/colony-js-client'
declare module '@colony/colony-js-adapter-ethers'

declare module '@colony/colony-js-contract-loader-fs' {
  export class TruffleLoader {
    constructor (opts: { contractDir: string })
  }

  export class FSLoader {
    constructor (opts: { contractDir: string, transformer: any })
  }
}
