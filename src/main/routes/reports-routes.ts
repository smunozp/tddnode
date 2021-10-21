import { HttpRequest, HttpResponse } from './../../interfaces/http-interface'
import { Router } from 'express'
import pgQuery from '../../infra/services/postgresdb/query-helper'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { ListAllProjects } from '../../controllers/reports/list-all'
import { ListDetailProjects } from '../../controllers/reports/list-detail'

export default (router: Router): void => {
  router.get('/list-all', AdaptRoute(new ListAllProjects()))
  router.get('/list-detail', AdaptRoute(new ListDetailProjects()))
}
