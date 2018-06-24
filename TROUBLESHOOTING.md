# Troubleshooting

If there are problems setting up the environment, error messages should 
be available to guide what is incorrect or missing.

Environments are sourced from `.env` files, and the DApp configuration
is printed to the console log on launch, and displayed during errors.

The relayer will "fail  fast" if connections are not found on launch. It can be very tempramental!

## Tools

### Kubernetes

`kubectl` is helpful for troubleshooting cluster deployments, i.e.

```bash
kubectl get ns
kubectl get deploymentnotifier
kubectl get colonylistener
kubectl get deploy --namespace=0xMyColonyAddress
kubectl get pod --namespace=0xMyColonyAddress
kubectl logs autonomous-relayer-uniqueid --namespace=0xMyColonyAddress
```

### DApp Cleaning 

#### Clean All
Pressing the "Clean all" button will:

- Delete all namespaces in the cluster beginning with "0x" (i.e. Colony addresses).
- Delete all resources of the custom type "deploymentnotifier" and "colonylistener"

**THIS INCLUDES A BOOTSTRAPPED AUTONOMOUS**, so be careful!

#### Clean

Pressing the "Clean" button with a specific address performs the above, but constrains
the deletion to only a specific 
