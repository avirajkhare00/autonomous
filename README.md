# Autonomous

![Logo Banner](https://i.imgur.com/lw7Oel9.jpg)

## Abstract

Autonomous; a platform which provides decentralised autonomous deployment for software and
hardware using cloud infrastructure. By decentralising the control of deployments,
changes to services can be made at any time and its infrastructure can be funded,
owned and controlled by decentralised communities.

Additionally, this platform is capable of itself being
controlled by a decentralised colony, whilst still providing 
services to control the deployments in other colonies. In short, 
the platform which controls colony infrastructure is itself controlled 
by a colony, and can update itself:
**Autonomous can manage and run itself through a shared, open source 
colony and maintain decentralised control of the platform.**

## Whitepaper & Bootstrapping Demo Video

[Autonomous - Whitepaper.pdf](/Autonomous%20-%20Whitepaper.pdf)

[Bootstrapping Demo Video](https://www.useloom.com/share/3c0ecf21022c46d98ff993f6ee4af22c)


## Packages

| Package                                              | Description
| ---------------------------------------------------- | --------------------------------------------------------------
| [`@autonomous/relayer`](/packages/relayer) | A service which orchestrates Colony-derived deployments to Kubernetes 
| [`@autonomous/dapp`](/packages/dapp)       | A web app which allows for the control of Colonies and Relayer helper functions
| [`@autonomous/colony`](/packages/colony)   | A collection of tools and scripts to power the infrastructure of Autonomous


## Requirements

- Node
- Browser with MetaMask installed
- Docker for Windows / Docker for Mac as the Kubernetes host (edge branch)

    [Docker for Mac (edge)](https://docs.docker.com/docker-for-mac/edge-release-notes/)
    
    [Docker for Windows (edge)](https://docs.docker.com/docker-for-windows/edge-release-notes/)

## Technical Demo Instructions

[Technical Demo](/DEMO.md)

[Troubleshooting](/TROUBLESHOOTING.md)

## Quick Guide for Users

1. Register or select a colony to use with Autonomous

!["Login" page](https://i.imgur.com/06j4VQS.jpg)

2. Navigate to "Deployment tasks" to manage deployments

![Deployment tasks](https://i.imgur.com/32ENMWu.jpg)

3. Create a new deployment task with a brief, worker address and evaluator address

![Create a new deployment task](https://i.imgur.com/n1kRMHa.jpg)

4. A transaction is initiated when creating deployment tasks. Users can track the status of the transaction via toast notifications

![Transaction statuses](https://i.imgur.com/6YLRhU1.jpg)

5. After a task has been successfully created, workers can submit their configurations for the deployment task

![Submit a configuration](https://i.imgur.com/vbGY51Z.jpg)

6. After a worker has submitted their configuration, evaluators can approve the configuration for deployment

![Approve and deploy a configuration](https://i.imgur.com/DEv0v9i.jpg)

7. Navigate to "Deployment logs" to track the history of deployments


![Deployment logs](https://i.imgur.com/CGgDWkG.jpg)

## Team

Jaime van Oers | Github: [@jvanoers](https://github.com/jvanoers) | Email: jaimevanoers@gmail.com

Ken Yip | Github: [@kkyip](https://github.com/kkyip) | Email: ken.yip.kky@gmail.com

Thomas Kingston | Github: [@DyslexicMot](https://github.com/DyslexicMot) | Email: tom.kingston.tfk@gmail.com

## License

Autonomous is licensed under the terms of the GNU Affero General Public License (GNU AGPLv3). See the licensing file for more details.
