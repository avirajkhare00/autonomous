# Autonomous Bootstrapping Technical Demo

Bootstrapping (in this demo) involves using a local Autonomous platform (DApp + Relayer)
to deploy a version of itself to the locally hoster Kubernetes cluster, **where it can
manage future deployments of itself and other services. (!!!)**

Demonstrating a successful bootstrapping procedure was one of the key
outcomes for the hackathon, as it demonstrates the technical requirements
that empower the Autonomous vision of **supercharged DAOs**.

Bootstrapping is a non-trivial, hand-cranky manual process for now. 

Tooling for this process shall be improved, but this document serves as a 
step-by-step tutorial on all the commands needed to Bootstrap an Autonomous platform
on your local dev environment. 

Customisation is possible, but not recommended for this demo.

## Setup

This procedure starts from a clean environment. The READMEs of individual components
or [Troubleshooting](/TROUBLESHOOTING.md) may provide help if issues arise. 


- Install `Docker for Windows` (with Kubernetes support, maybe edge) / Docker for Mac.

- Ensure `docker` is accessible in `$PATH` (used when building test images)

#### Clone the repository:

```bash
git clone git@github.com:jvanoers/autonomous.git
``` 

#### Install dependencies:

```bash
cd autonomous 
yarn
```

#### (If bootstrapping) Build docker images

Bootstrapping involves running the Autonomous DApp and Relayer on the cluster,
referenced by docker tag in the Kubernetes config.

The example configuration looks for images `autonomous-dapp` and `autonomous-relayer`.

When build, these images will be registered with the local Docker/Kubernetes automatically if
the environment is configured correctly.

Execute from the root directory:
```bash
./bootstrap/buildPackage.sh relayer 0.1
./bootstrap/buildPackage.sh dapp 0.1
```

#### Start services

The demo requires the following services to be locally available:

- IPFS
- Ganache
- Contract Service

#### Copy configuration files for components

Where `autonomous/` represents the `autonomous` root directory 

```bash
cd autonomous/packages/colony
cp .env.example .env
vi .env  # example config should suffice 
```

```bash
cd autonomous/packages/dapp
cp .env.example .env
vi .env  # example config should suffice 
```

```bash
cd autonomous/packages/relayer
cp .env.example .env
vi .env  # example config should suffice 
```

#### Compile the smart contracts
```bash
cd autonomous/packages/colony
yarn truffle:compile
```

#### Start background services

Tooling is managed from `autonomous/packages/colony`:

```bash
cd autonomous/packages/colony
```

Open the following in multiple terminals:

| Command          | Default endpoint | Description
|------------------| ------------- | --------------|
|`yarn ipfs:start` | `API: localhost:43123 Gateway: localhost:43124` | Starts the IPFS daemon |
| `yarn ganache:start` | `localhost:8545` | Start a local Blockchain |
| `yarn contracts:serve` | `localhost:3030` | Start the contract service (used by DApp, Relayer and tools) |


#### Migrate the colony to the local blockchain

```bash
cd autonomous/packages/colony
yarn cli migrate
```

#### Start the DApp

```bash
cd autonomous/packages/dapp
yarn start
```

Default endpoint `localhost:3000`

#### Start the relayer

```bash
cd autonomous/packages/relayer
yarn start
```

Default endpoint: `localhost:4030`

### **No errors means good config!**

## Demo 1: Deploying an nginx server through a Colony

This demo will create a Colony that deploys an nginx server (via a single instance cluster)
to serve on `localhost:5555`.

#### Create a Colony which will own the nginx server and deployment

Note: As Autonomous is a tool aimed to augment existing Colonies and DAOs, 
we expect for Colony creation to occur elsewhere in typical usage.

```bash
cd packages/Colony
yarn cli add
```

- Note down the `Colony Address`

  *With the preconfigured account:* 
  *0x4479B49eE193E6107Ed2Ad38A9b089Ee362542BA*
- CTRL+C out


#### Log into the Colony in the DApp

The DApp allows for basic orchestration of tasks within the colony, specifically
it enables the upload and deployment of Kubernetes configurations.

- Open `localhost:3000`
- Configure your browser `MetaMask` to use the test account

  `myth like bonus scare over problem client lizard pioneer submit female collect`
  
- If the environments are configured correctly, there should be no errors!

  *Informative errors should be shown if they occur!*
   
- Enter the `Colony Address` in "Register" field

  *0x4479B49eE193E6107Ed2Ad38A9b089Ee362542BA*

#### Create a deployment

A deployment task will be created by a manager to represent a change they 
would like to occur within their colony, e.g.

`Upgrade myService to v1.2`

`Increase replication of AIComputeCluster to 20`

We are creating a deployment to release a new `nginx` service at `localhost:5555`:

- Click Create deployment
    
   Brief: Text description of the deployment request
   Evaluator: This can be any user, but select the current `MetaMask` 
   account current for this demo
   
- Click Create button

    `MetaMask` will initiate prompts with multiple transactions,
    these need to be accepted.


*Bonus step for the skeptics*:

 ```bash
 curl localhost:5555 # this is to prove nothing is currently running
 ```
 
#### Submit a complete nginx configuration

Now a task is created, a worker can produce configuraiton that meets the specifications
of the task. 

In this demo, a configuration is supplied at: 
```
cat autonomous/bootstrap/deployments/examples/nginx.json
``` 

It contains a `Deployment` of an `nginx` image, and a `Service` exposing the default
nginx port (`5555`)

- On the created task, click on Submit work
- Paste in the contents of the `nginx.json` Kuberenetes config into the `Configuration` field

- Click submit

  `Metamask` will prompt for more confirmations, accept these.
  
#### Confirm the configuration and deploy the service

Now the configuration has been assigned to the task, it can be evaluated through
a number of different control mechanisms to ensure the configuration meets 
the criteria of the Colony to be deployed.

In this demo, there is no control except to be manually triggered in the DApp.
See the whitepaper for more information about this step.

- On the created task, click on Deploy
- Confirm the configuration is correct
- Click deploy

Check the logs by navigating to `Deployment Logs`

- Click Refresh log

#### See the deployed service

The relayer will have automatically picked up this deployment and executed
the configuration on the Kubernetes cluster, therefore (after some waiting) the 
service will become available.

- Open a browser to `localhost:5555`!

```bash
curl localhost:5555 # nginx starts!
```

#### Optional: Clean up cluster

This step will delete all namespaces (services/deployments) and cluster 
resources assigned to colonies.

- Click `Change Colony`
- Paste in the colony address to clean
- Click `Clean Colony` 
- Confirm `localhost:5555` is offline (be careful of caching)


## Demo 2.a: Bootstrapping Autonomous

This demo will use Autonomous to deploy a version of itself onto the local
cluster. It then uses the cluster-hosted deployment to both launch another
service (i.e. Demo 1) as well as perform an upgrade to itself.

#### Create a new Autonomous Colony
```bash
cd autonomous/packages/colony
yarn cli add
```

- Note down address
 
    *0x44F44C1dEFf80a3E94B96E872233fcB63e425438*
    
- CTRL+C out of the script


#### Register the colony

As before:
- Open the DApp
- Enter the created colony address
- Click `Register`

#### Create a deployment
 
- Create deployment
- Add brief, worker address, evaluator address (use the current account)
- Click Submit
- Approve `MetaMask` transactions

#### Submit the Autonomous platform configuration

Version 0.1 of the Autonomous platform configuration can be found at:

```bash
cat autonomous/bootstrap/deployments/combined.json
```

It will launch a pre-configured version of the `DApp` (`localhost:9999`)
and `Relayer` (`localhost:8888`):

- Click Submit on the created task
- Paste in the Kubernetes config
- Click Submit
- Approve `MetaMask` transactions

#### Deploy Autonomous

- Click Deploy
- Approve `MetaMask` transactions

Now the magic is happening behind the scenes. The services may take a minute to start up. 

To test for a successful deployment:

- Open a browser to `localhost:9999`
- Confirm the title in the top left says `Autonomous (Kubernetes)`

Congratulations, Autonomous deployed itself!

#### Turn off local Autonomous

Where you previous ran `yarn start` for the `DApp` and `Relayer`, turn
off those local services.

#### Run through Demo 1 again using new DApp

Instead of using the localhost DApp (`localhost:3000`), instead run through
the same procedure using (`localhost:9999`).

*Note:* Ensure the `nginx` colony has been cleaned up to prove a fresh 
deployment.

- Open the DApp (`localhost:9999`)
- Register test Colony

    *0x4479B49eE193E6107Ed2Ad38A9b089Ee362542BA*

- Run through Creating, Submitting, and Deploying as above.

- Confirm `localhost:5555` shows `nginx` once successful.

## Demo 2.b: Using Autonomous to upgrade itself

The final puzzle piece in bootstrapping Autonomous is to prove it can upgrade
itself once deployed in the cluster.

This demo will work through the steps of upgrading the Autonomous relayer to
a new version which exposes a new API endpoint at `localhost:8888/hello`

Suspicious individuals can confirm the hello endpoint does not currently exist:
```bash
curl localhost:8888/hello 
# -> 404 not found 
```

#### Change the Relayer to include the new endpoint

```bash
vi autonomous/packages/relayer/RelayServer.ts
```

Under `configureRoutes()`, add code which represents a software change in
Autonomous:

```js
router.get('/hello', ctx => {
    ctx.status = 200
    ctx.body = { hello: 'world!' }
})
```

#### Build a new version of the Autonomous image

Once the change is complete, tag the code change in a new container version.

This will build `autonomous-relayer:0.2`

```bash
cd autonomous/
./bootstrap/buildPackage.sh relayer 0.2
```

#### Deploy an updated config to the Autonomous Colony

- Login to the autonomous colony

    (Login, not register)
    *0x44F44C1dEFf80a3E94B96E872233fcB63e425438*

- Create a new deployment as before
- Approve the transactions

- Update the config file to use the new docker tag

    Find instances of `autonomous-relayer:0.1` and replace with `autonomous-relayer:0.2`.
    
    Line 119:
    ```bash
    vi autonomous/bootstrap/deployments/combined.json
    ```

- Submit the updated config to the task
- Approve the `MetaMask` transactions

- Deploy the task

#### Confirm the deployment was successful

The Relayer will have submitted the updated configuration to the cluster, which
will restart itself and the DApp.

- Wait for the services to deploy
- Confirm the change made has propagated to the platform:

    ```bash
    curl localhost:8888/hello
    --> { "hello": "world!" }
    ```
    
Congratulations, you have now fully bootstrapped the Autonomous technical demo!
