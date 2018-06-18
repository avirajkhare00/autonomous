import 'rxjs/add/observable/combineLatest'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/bindNodeCallback'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/timeout'
import 'rxjs/add/operator/delay'
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
import { fromStream } from '../utils/rxjs/fromStream'
import { Observable } from 'rxjs'
// import { resolve } from 'path'

const crd = require('../kubernetes/crds/dn.json')

function watchDeployment (client: Client, notifier: DeploymentNotifierResource) {
  let version = '(none)'

  let deployments$ = fromStream(client.apis.apps.v1.watch.ns(notifier.colonyAddress).deploy(notifier.deploymentName).getStream())
    .map(buffer => JSON.parse(buffer.toString()) as StreamEvent<DeploymentEvent>)

  deployments$.subscribe(event => {

    const newVersion = event.object.spec.template.spec.containers.map((container: any) => container.image).join(',')

    console.log(`DeploymentNotifier ${ notifier.metadata.name }: ${ event.object.metadata.name } ${ event.type }`)
    if (version !== newVersion) {
      console.log(`${ version } -> ${ newVersion }`, JSON.stringify(notifier, null, 2))
      version = newVersion
    }
  })

  return deployments$
}

function watchDeploymentNotifiers (client: Client) {

  const deploymentNotifiers$ = fromStream(client.apis['autonomous-labs.io'].v1.watch.deploymentnotifiers.getStream())
    .map(buffer => JSON.parse(buffer.toString()) as StreamEvent<DeploymentNotifierEvent>)

  const watchers: Map<string, Observable<StreamEvent<DeploymentEvent>>> = new Map()

  deploymentNotifiers$.subscribe(event => {
    const id = `${ event.object.metadata.namespace }/${ event.object.metadata.name }`
    if (event.type === 'ADDED') {
      //
      // Watch the Deployment for each DeploymentNotifier.
      //
      watchers.set(id, watchDeployment(client, event.object as any))
    } else if (event.type === 'DELETED') {
      watchers.delete(id)
    }
  })
}

async function main () {
  try {
    const client = new Client({ config: config.fromKubeconfig() })
    await client.loadSpec()

    console.log('Loaded config')
    //
    // Create the CRD if it doesn't already exist.
    //
    try {
      await client.apis['apiextensions.k8s.io'].v1beta1.customresourcedefinitions.post({ body: crd })
    } catch (err) {
      //
      // API returns a 409 Conflict if CRD already exists.
      //
      // await client.apis['apiextensions.k8s.io'].v1beta1.customresourcedefinitions(crd.metadata.name).delete()
      //
      // await client.apis['apiextensions.k8s.io'].v1beta1.customresourcedefinitions.post({ body: crd })

      if (err.statusCode !== 409) throw err
    }

    console.log('Checked CRDs')

    //
    // Add endpoints to our client
    //
    client.addCustomResourceDefinition(crd)

    //
    // Watch DeploymentNotifiers.
    //
    watchDeploymentNotifiers(client)
  } catch (err) {
    console.error('Error: ', err)
  }
}

main()
