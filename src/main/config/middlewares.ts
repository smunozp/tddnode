import { Express } from 'express'
import { cors } from '../middlewares/cors'
import { bodyParser, urlEncoded } from '../middlewares/body-parse'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(urlEncoded)
  app.use(cors)
}
