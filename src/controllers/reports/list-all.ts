import { serverError, success } from '../../helpers/http-helpers'
import { ReportRepository } from '../../infra/repositories/reports-repository'
import { Controller } from '../../interfaces/controller-interface'
import { HttpResponse } from '../../interfaces/http-interface'

export class ListAllProjects implements Controller {
  async handle(): Promise<HttpResponse> {
    try {
      const report = new ReportRepository()

      const reportResult = await report.getAllProjects()

      return success({
        'projects-count': reportResult.rowCount,
        'projects-details': reportResult.data,
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
