import { ProjectDetails } from '../../domain/models/project-details'
import {
  badRequest,
  notFound,
  serverError,
  success,
} from '../../helpers/http-helpers'
import { ReportRepository } from '../../infra/repositories/reports-repository'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest, HttpResponse } from '../../interfaces/http-interface'

export class ListDetailProjects implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name } = httpRequest.query

    if (!name) {
      return badRequest(new Error('Parameter "name" is missing'))
    }
    try {
      const report = new ReportRepository()

      const reportResult = await report.getProjectDetail(name)

      if (reportResult.rowCount === 0) {
        return notFound(name)
      }

      const reportDetail = new ProjectDetails(
        reportResult.data,
        reportResult.rowCount,
        name
      )

      return success({
        'project-name': reportDetail.projectName,
        'total-minutes': reportDetail.totalMinutes,
        'total-segments': reportDetail.totalSegments,
        'segments': reportDetail.segments,
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
