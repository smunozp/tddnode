import { serverError, success } from '../../helpers/http-helpers'
import { ReportRepository } from '../../infra/repositories/reports-repository'
import { Controller } from '../../interfaces/controller-interface'
import { HttpResponse } from '../../interfaces/http-interface'

export class ListAllProjects implements Controller {
  constructor(private readonly reportRepository: ReportRepository) {}
  async handle(): Promise<HttpResponse> {
    try {
      const reportResult = await this.reportRepository.getAllProjects()
      const productDetails = reportResult.data.filter(
        (row) => row.minutes !== null
      )
      return success({
        'projects-count': productDetails.length,
        'projects-details': productDetails,
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
