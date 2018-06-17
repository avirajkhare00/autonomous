import dotenv from 'dotenv-safe'
import { ColonyFactory } from './ColonyFactory'

dotenv.config()

new ColonyFactory().create()
  .then(() => console.log('Created colony!'))
  .catch(console.log.apply('Error creating colony'))
