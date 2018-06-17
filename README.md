# Autonomous Monorepo

## Development

First, start a local Ethereum instance (ganache)

```bash
cd packages/colony
yarn run ganache:start
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

*Note: Copy the contract address*

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
