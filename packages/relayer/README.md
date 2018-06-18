# Relayer

The component which connects to Colonies, listens for completed tasks, and executes deployments.

## Setup

#### Setup minikube:

[https://github.com/kubernetes/minikube](https://github.com/kubernetes/minikube)

Start a local kubernetes test cluster:

```bash
# Unix
minikube start

# Windows:
minikube start --vm-driver hyperv
```

_TODO_: Write GKE instructions (from kubeconfig)

#### Start the relayer

```bash
yarn start
```

## Utils

Handy UI for testing:
```bash
minikube dashboard
```

Building docker images for minikube:

[https://stackoverflow.com/questions/42564058/how-to-use-local-docker-images-with-minikube]()
```bash
eval $(minikube docker-env)
docker build -t my-image .
```
