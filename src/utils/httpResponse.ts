export class HttpResponse {
  statusCode: number
  body: string

  constructor(statusCode: number, body: { [key: string]: any } | string) {
    this.statusCode = statusCode
    this.body = JSON.stringify(body)
  }

  static ok(body: any) {
    return new HttpResponse(200, body)
  }

  static created(body: any) {
    return new HttpResponse(201, body)
  }

  static noContent() {
    return new HttpResponse(204, '')
  }
}
