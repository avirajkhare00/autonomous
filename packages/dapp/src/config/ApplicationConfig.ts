export interface Environment {
  APP_NAME: string
  IPFS_HOST: string,
  IPFS_API_PORT: number,
  CONTRACT_SERVER_HOST: string,
  CONTRACT_SERVER_PORT: number,
}

export const env: Environment = {
  APP_NAME: process.env.REACT_APP_APP_NAME || '',
  IPFS_HOST: process.env.REACT_APP_IPFS_HOST || '',
  IPFS_API_PORT: Number(process.env.REACT_APP_IPFS_API_PORT) || 0,
  CONTRACT_SERVER_HOST: process.env.REACT_APP_CONTRACT_SERVER_HOST || '',
  CONTRACT_SERVER_PORT: Number(process.env.REACT_APP_CONTRACT_SERVER_PORT) || 0
}
