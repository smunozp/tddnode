import { Router } from 'express'
import { StopTrackingProject } from '../../controllers/tracking-project/stop-tracking'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { StartTrackingProject } from '../../controllers/tracking-project/start-tracking'

export default (router: Router): void => {
  router.post('/start', AdaptRoute(new StartTrackingProject()))

  router.post('/stop', AdaptRoute(new StopTrackingProject()))
}
