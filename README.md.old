# Autonomous Monorepo

## Development

First, start a local Ethereum instance (ganache)

```bash
cd packages/colony
yarn run ganache:start
```

Start a local IPFS node:

```bash
cd packages/colony
yarn run ipfs:start
```

Ensure contracts are compiled: 
```bash
cd packages/colony
yarn run contracts:compile
```

Then, start a contract server

```bash
cd packages/colony
yarn run contracts:serve
```

Then, deploy Colony on the test network

```bash
cd packages/colony
yarn run contracts:deploy
```

Then, create a test colony using the Colony deployment 
```bash
cd packages/colony
yarn run colony:add
```

*Note: Copy the colony address*

Then, run the DApp which will use the ContractServer
```bash
cd packages/dapp
yarn start
```

Then, ensure your metamask is pointed to your local ganache instance:
```
open http://localhost:3000

MetaMask --> Networks Dropdown
:: Select Localhost:8545
```

## Use yarn!

Run on repo root (installs all dependencies in `/packages`)

```bash
yarn install
```

## Lerna

Lerna is a good place to learn(a) about monorepos.

[https://github.com/lerna/lerna](https://github.com/lerna/lerna)

test

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
