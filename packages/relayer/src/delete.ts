/* eslint no-console:0 */
//
// Example "DeploymentNotifier" controller using a Custom Resource Definition
// to configure a "notifier" on changes to Deployments.
//
// You can experiment with the controller by creating a Deployment and an
// associated DeploymentNotifier object:
//
//   $ kubectl apply -f examples/nginx-deployment.json
//   $ kubectl apply -f examples/nginx-deployment-notifier.json
//   $ kubectl set image deployment/nginx-deployment nginx=nginx:1.9.1
//
// One shortcoming of this implementation is the lack of support for handling
// disconnections from watch endpoints. The kube-apiserver periodically
// disconnects watch streams (according to --min-request-timeout).
//
import { Client, config } from 'kubernetes-client'

const crd = require('./crds/deployment-notifier.json')

async function main () {
  try {
    const client = new Client({ config: config.fromKubeconfig() })
    await client.loadSpec()

    await client.apis['apiextensions.k8s.io'].v1beta1.customresourcedefinitions(crd.metadata.name).delete()
  } catch (err) {
    console.error('Error: ', err)
  }
}

main()
