import { StartTrackingProject } from '../../../controllers/tracking-project/start-tracking'
import { TrackingProjectRepository } from '../../../infra/repositories/tracking-project-repository'

export const makeStartTrackingProjectController = (): StartTrackingProject => {
  const trackingRepository = new TrackingProjectRepository()
  const startTrackingProject = new StartTrackingProject(trackingRepository)
  return startTrackingProject
}
