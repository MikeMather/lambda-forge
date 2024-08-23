import { HttpResponse } from '../utils/httpResponse'

export default class GenericError extends Error {
  public statusCode: number
  constructor(name: string, statusCode: number, message: string) {
    super(message)
    this.name = name
    this.statusCode = statusCode
  }

  public toResponse(): HttpResponse {
    return new HttpResponse(this.statusCode, { message: this.message })
  }
}
