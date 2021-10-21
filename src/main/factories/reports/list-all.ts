import { ListAllProjects } from '../../../controllers/reports/list-all'
import { ReportRepository } from '../../../infra/repositories/reports-repository'

export const makeListAllProjectsController = (): ListAllProjects => {
  const reportRepository = new ReportRepository()
  const listAllProjects = new ListAllProjects(reportRepository)
  return listAllProjects
}
