# Autonomous Colony (Tooling)

## Introduction

This package contains tooling, scripts and helpers which aid the technical demo.

The scripts are very rough and can do with a better developer experience, 
but that's marked as a "nice-to-have" improvement.

For the technical demo, all mnemonics/accounts are hardcoded. 
**The mnemonic used to configure the below services should be imported into 
MetaMask when testing the DApp.**

## Setup

Before starting, configure a local environment:
```
cp .env.example .env
vi .env                # The example configuration should suffice for the demo
```

### Capabilities

#### Start a local Ethereum blockchain (Ganache)

Uses default settings:

```bash
yarn ganache:start
```

#### Start a local IPFS node

Uses default settings:

```bash
yarn run ipfs:start
```

#### Compile contracts

Uses default settings 

```bash
yarn contracts:compile
```

#### Contract Service (TrufflePig lite alternative)

Uses default settings

```bash
yarn run contracts:serve
```

#### Deploy Colony platform to local chain 

This requires the contracts to have been compiled and the contract server to be running

```bash
yarn cli migrate
```

#### Creating a colony

Creates a token and a Colony using default settings. 
The address of the created token and Colony are printed to the console.

Specifying a token has no purpose in this demo.
```bash
yarn cli add
```

*Note: Some environments don't terminate the script, so you might need to CTRL+C it*


## Bootstrap

Pre-Step: 
Setup dev env: Ganache, IPFS, contract server
Colony: migrate colony base contracts

1. Build images for dapp and relayer
2. Start relayer with local config
3. Create a colony
4. Register colony with local relayer
5. Deploy combined config to relayer
6. Stop local relayer
7. Open kubernetes app/ relayer
App: localhost:9999, relayer:8888
8. Use bootstrapped relayer to manage (including itself) 
