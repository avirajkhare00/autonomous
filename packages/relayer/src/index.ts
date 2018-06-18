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
import { Stream } from 'stream'
import { fromStream } from './rxjs/fromStream'
// import { resolve } from 'path'

const crd = require('./crds/deployment-notifier.json')

function watchDeployment (client: Client, notifier: any) {
  let version = '(none)'
  const stream = client.apis.apps.v1.watch.ns('default').deploy(notifier.deploymentName).getStream()

  // const jsonStream = new JSONStream()
  // stream.pipe(jsonStream)

  stream.on('data', async (eventBuffer: any) => {
    // console.log(eventBuffer.toString())
    let event = JSON.parse(eventBuffer.toString())

    const newVersion = event.object.spec.template.spec.containers.map((container: any) => container.image).join(',')
    //
    // Simple "notification": log to the console. A better option could be
    // calling the New Relic Deployment API or GithHub Deloyment Status or ...
    //
    console.log(`DeploymentNotifier ${ notifier.metadata.name }: ${ event.object.metadata.name } ${ event.type }`)
    if (version !== newVersion) {
      console.log(`${ version } -> ${ newVersion }`, JSON.stringify(notifier.notify, null, 2))
      version = newVersion
    }
  })

  return stream
}

function watchDeploymentNotifiers (client: Client) {

  const stream: NodeJS.ReadableStream = client.apis['autonomous-labs.io'].v1.watch.deploymentnotifiers.getStream()
  const watchers: Map<string, Stream> = new Map()

  fromStream(stream)

  stream.on('data', async (eventBuffer: Buffer) => {
    let event = JSON.parse(eventBuffer.toString())

    const id = `${ event.object.metadata.namespace }/${ event.object.metadata.name }`
    if (event.type === 'ADDED') {
      //
      // Watch the Deployment for each DeploymentNotifier.
      //
      watchers.set(id, watchDeployment(client, event.object))
    } else if (event.type === 'DELETED') {

      // watchers.get(id)!.abort()
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
