import { DatabaseError } from '../errors/database'
import { NotFoundError } from '../errors/not-found'
import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../interfaces/http-interface'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message,
})

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: { error: error.message },
})

export const notFound = (data: any): HttpResponse => ({
  statusCode: 404,
  body: new NotFoundError(data),
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
})

export const databaseError = (message: string): HttpResponse => ({
  statusCode: 500,
  body: new DatabaseError(message),
})

export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
})
