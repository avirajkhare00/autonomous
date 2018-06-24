# Autonomous Relayer

## Introduction 

This services subscribes to Colonies, listens for completed tasks, and executes deployments.

It also listens to resources in the Kubernetes cluster to retrieve its configuration from
the cluster itself where possible.
 
## Setup

### Kubernetes Cluster

The relayer deploys Dockerized services to a connected Kubernetes cluster.

Currently all example configurations require the "Docker for X" (with Kubernetes)
driver, as it uses specific features of that environment for convenience in this demo, such as 
exposing local services to the cluster via a service:
```json
{
    "type": "ExternalName",
    "sessionAffinity": "None",
    "externalName": "host.docker.internal"
}
```

Other environments are not currently supported, but can be added as an exercise for
the reader. Extension to GKE/AKE/EKS is expected to be mostly painless.

#### Setup Docker for Windows / Docker for Mac with Kubernetes:

Download the latest version for your platform with Kubernetes support.
(Edge edition on Windows)

{{TODO}} Add Links to download pages

#### Required Services

The relayer requires the following services

- **Kubernetes cluster**: (with a kubeconfig in the normal user location)
- **IPFS**: for storing and retrieving deployment configuration
- **Ethereum Blockchain**: to listen for TaskFinalized events on Colonies
- **Contract Server**: to provide the ABI definitions to the relayer for interaction


#### Setup environment

```bash
cp .env.example .env
vi .env                 # The example configuration should suffice for the demo
```
#### Start the relayer

```bash
yarn start
```

## Utils

An exercise for the reader is to setup their Kubernetes cluster to serve the official dashboard, which
can be useful for debugging.
