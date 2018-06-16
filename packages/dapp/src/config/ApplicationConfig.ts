interface Environment {
  APP_NAME: string
}

export const env: Environment = {
  APP_NAME: process.env.REACT_APP_APP_NAME || ''
}
