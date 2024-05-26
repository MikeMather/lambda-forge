// An HTTP response compatible with API gateway
export interface HttpResponse {
  statusCode: number
  headers: { [key: string]: string }
  body: string
}

export class HttpResponse {
  constructor(statusCode: number, body: any) {
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
