import { LastProjectSegment } from '../../domain/models/last-project-segment'
import {
  badRequest,
  serverError,
  success,
} from '../../helpers/http-helpers'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest, HttpResponse } from '../../interfaces/http-interface'

export class StartTrackingProject implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name } = httpRequest.body

    if (!name) {
      return badRequest(new Error('Parameter "name" is missing'))
    }
    try {
      const lastSegment = new LastProjectSegment(name)
      await lastSegment.getLastSegmentProject()
      if (lastSegment.isStarted()) {
        return badRequest(new Error(`Project "${name}" already started`))
      }

      const startTrackingResult = await lastSegment.startRegister()

      if (startTrackingResult) {
        return success(`Project ${name} Tracking STARTED`)
      } else {
        return serverError(new Error('Failed to start project'))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
