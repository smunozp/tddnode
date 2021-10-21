import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeListAllProjectsController } from '../factories/reports/list-all'
import { makeListDetailProjectsController } from '../factories/reports/list-detail'

export default (router: Router): void => {
  router.get('/list-all', AdaptRoute(makeListAllProjectsController()))
  router.get('/list-detail', AdaptRoute(makeListDetailProjectsController()))
}
