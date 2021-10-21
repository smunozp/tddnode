import { StopTrackingProject } from '../../../controllers/tracking-project/stop-tracking'
import { TrackingProjectRepository } from '../../../infra/repositories/tracking-project-repository'

export const makeStopTrackingProjectController = (): StopTrackingProject => {
  const trackingRepository = new TrackingProjectRepository()
  const stopTrackingProject = new StopTrackingProject(trackingRepository)
  return stopTrackingProject
}
