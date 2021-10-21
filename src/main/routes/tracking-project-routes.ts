import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeStartTrackingProjectController } from '../factories/tracking-project/start-tracking'
import { makeStopTrackingProjectController } from '../factories/tracking-project/stop-tracking'

export default (router: Router): void => {
  router.post('/start', AdaptRoute(makeStartTrackingProjectController()))

  router.post('/stop', AdaptRoute(makeStopTrackingProjectController()))
}
