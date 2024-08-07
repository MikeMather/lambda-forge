import { HttpResponse } from '../utils/httpResponse'

export default class GenericError extends Error {
  public statusCode: number
  constructor(message: string) {
    super(message)
    this.name = 'GenericError'
    this.statusCode = 500
  }

  public toResponse(): HttpResponse {
    return new HttpResponse(this.statusCode, { message: this.message })
  }
}
