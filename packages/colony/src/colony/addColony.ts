import { default as ColonyNetworkClient, ColonyClient } from '@colony/colony-js-client'

export async function addColony (
  networkClient: ColonyNetworkClient,
  tokenName: string = 'Test Token',
  tokenSymbol: string = 'TST'
): Promise<ColonyClient> {
  const tokenAddress = await networkClient.createToken({
    name: tokenName,
    symbol: tokenSymbol
  })

  console.log('Token address: ' + tokenAddress)

  let result = await networkClient.createColony.send({ tokenAddress })

  let { colonyId, colonyAddress } = result.eventData!

  console.log('Colony ID: ' + colonyId)
  console.log('Colony address: ' + colonyAddress)

  return networkClient.getColonyClient(colonyId)
}
