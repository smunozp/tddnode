import * as express from 'express'
import { config as dotenv } from 'dotenv'
import routes from './routes'
import middlewares from './middlewares'
// import routes from './routes'
dotenv()
const app = express()
middlewares(app)
routes(app)

export default app
