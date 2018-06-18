export const parseDeploymentOrThrow = (deployment: any) => {
  if (deployment === null && typeof deployment === 'object') throw new Error('Deployment is null')

  if (deployment.kind !== 'Deployment') throw new Error('Not a deployment')

  if (!deployment.metadata || !deployment.metadata.name) throw new Error('Deployment has no name')

  return deployment
}
