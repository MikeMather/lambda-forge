import { APIGatewayProxyResult } from 'aws-lambda'

export class Response {
  public statusCode: number
  public headers: { [key: string]: string | boolean | number }
  public body: string

  constructor() {}

  public status(statusCode: number): Response {
    this.statusCode = statusCode
    return this
  }

  public setHeader(key: string, value: string | boolean | number): Response {
    if (!this.headers) {
      this.headers = {}
    }
    this.headers[key] = value
    return this
  }

  public send(): APIGatewayProxyResult {
    return {
      statusCode: this.statusCode,
      headers: this.headers,
      body: this.body
    }
  }
}
