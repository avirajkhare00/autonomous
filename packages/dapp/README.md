# Autonomous DApp

## Introduction

This is the DApp that powers interactions with the colony, and against the Relayer.

The dual purpose of the DApp was chosen for simplicitly for the technical demo.

## Development

Copy environment files to configure the app
```bash
cp .env.example .env
vi .env                 # The example configuration should suffice for the demo
```

To serve the app, run:

```bash
yarn start
```

## Requirements

The DApp requires a connection to 

- **Ethereum Blockchain**: (via MetaMask pointing at local instance)
- **Contracts Service**: to provide ABI definitions for the app
- **IPFS**: for storing and retrieving specification / delivery information 
    (Briefs and configuration files)
- **Relayer**: to register Colonies and offer a demo UI with helper functions to manage 
artifacts created on the local Kubernetes cluster

Errors will be shown that try to illuminate where configuration might have gone
wrong if these services are not found.

## Capabilities

Interact with a deployed Colony for the purposes of deploying Kubernetes configurations:

- Add Deployment Tasks ("Manager Creation")
- Submit configuration to tasks ("Worker Submission")
- Deploy configuration ("Evaluator Rating/Approval")

Interact with Relayer / Kubernetes:
- Register a colony to be listened to
- See deployment events from Kubernetes listeners
