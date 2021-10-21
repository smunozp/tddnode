import { HttpRequest } from '../../interfaces/http-interface'
import { Controller } from '../../interfaces/controller-interface'
import { Request, Response } from 'express'
export const AdaptRoute = (controler: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
    }
    const httpResponse = await controler.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
