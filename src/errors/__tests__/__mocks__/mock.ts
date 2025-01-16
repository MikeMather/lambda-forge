import type { HttpResponse } from '../../../utils/httpResponse'
import { jest } from '@jest/globals'
import { APIGatewayProxyResult } from 'aws-lambda'

const mockResponse: APIGatewayProxyResult = {
  statusCode: 400,
  body: 'Mock response body',
  headers: {}
}

export const mockHttpResponse: Partial<HttpResponse> = {
  statusCode: 400,
  body: 'Mock response body',
  headers: {},
  toResponse: jest.fn<() => APIGatewayProxyResult>().mockReturnValue(mockResponse)
}
