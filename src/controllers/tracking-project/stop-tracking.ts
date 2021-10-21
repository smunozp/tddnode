import { LastProjectSegment } from '../../domain/models/last-project-segment'
import {
  badRequest,
  notFound,
  serverError,
  success,
} from '../../helpers/http-helpers'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest, HttpResponse } from '../../interfaces/http-interface'

export class StopTrackingProject implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name } = httpRequest.body

    if (!name) {
      return badRequest(new Error('Parameter "name" is missing'))
    }
    try {
      const lastSegment = new LastProjectSegment(name)
      await lastSegment.getLastSegmentProject()
      if (!lastSegment.projectExist) {
        return notFound(name)
      }

      const stopTrackingResult = await lastSegment.stopRegister()

      if (stopTrackingResult) {
        return success(`Project ${name} Tracking STOPPED`)
      } else {
        return badRequest(new Error(`Project "${name}" already stopped`))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
