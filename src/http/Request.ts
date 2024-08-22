import { APIGatewayProxyEvent } from 'aws-lambda'

export class Request {
  public query: { [key: string]: string | undefined }
  public params: { [key: string]: string | undefined }
  public headers: { [key: string]: string | undefined }
  public body: any
  public context: { [key: string]: any }

  constructor(event: APIGatewayProxyEvent) {
    this.query = event.queryStringParameters || {}
    this.params = event.pathParameters || {}
    this.headers = event.headers || {}
    this.body = event.body ? JSON.parse(event.body) : null
    this.context = {}
  }
}
