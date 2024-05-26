import { APIGatewayProxyResult } from 'aws-lambda'
import GenericError from './generic.error'
import { HttpResponse } from '../utils/httpResponse'

/**
 * ValidationError class
 * @extends GenericError
 * @param {string} message - Error message
 * @param {string[]} errors - Array of errors
 * @param {number} statusCode - HTTP status code
 */
export default class ValidationError extends GenericError {
  public statusCode: number
  public errors: string[]

  constructor(message: string, errors: string[]) {
    super(message)
    this.name = 'ValidationError'
    this.statusCode = 400
    this.errors = errors
  }

  public toResponse(): APIGatewayProxyResult {
    return new HttpResponse(this.statusCode, {
      message: this.message,
      errors: this.errors
    })
  }
}
