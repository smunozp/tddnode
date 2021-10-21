import { ListDetailProjects } from '../../../controllers/reports/list-detail'
import { ReportRepository } from '../../../infra/repositories/reports-repository'

export const makeListDetailProjectsController = (): ListDetailProjects => {
  const reportRepository = new ReportRepository()
  const listDetailProject = new ListDetailProjects(reportRepository)
  return listDetailProject
}
