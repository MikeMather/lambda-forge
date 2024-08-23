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
    super('ValidationError', 400, message)
    this.errors = errors
  }

  public toResponse(): HttpResponse {
    return new HttpResponse(this.statusCode, {
      message: this.message,
      errors: this.errors
    })
  }
}
