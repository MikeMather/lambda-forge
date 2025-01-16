import 'reflect-metadata'
import { jest, describe, it, expect } from '@jest/globals'
import { Request } from '../Request'
import { APIGatewayProxyEvent } from 'aws-lambda'

describe('Request', () => {
  const createMockEvent = (overrides = {}): APIGatewayProxyEvent => ({
    queryStringParameters: null,
    pathParameters: null,
    headers: {},
    body: null,
    httpMethod: 'GET',
    isBase64Encoded: false,
    path: '/',
    requestContext: {} as any,
    resource: '',
    multiValueHeaders: {},
    multiValueQueryStringParameters: null,
    stageVariables: null,
    ...overrides
  })

  it('should initialize with empty objects when event properties are null', () => {
    const request = new Request(createMockEvent())
    
    expect(request.query).toEqual({})
    expect(request.params).toEqual({})
    expect(request.headers).toEqual({})
    expect(request.body).toBe('')
    expect(request.context).toEqual({})
  })

  it('should correctly assign event properties', () => {
    const mockEvent = createMockEvent({
      queryStringParameters: { page: '1' },
      pathParameters: { id: '123' },
      headers: { 'content-type': 'application/json' }
    })
    
    const request = new Request(mockEvent)
    
    expect(request.query).toEqual({ page: '1' })
    expect(request.params).toEqual({ id: '123' })
    expect(request.headers).toEqual({ 'content-type': 'application/json' })
  })

  describe('body parsing', () => {
    it('should parse JSON body correctly', () => {
      const mockEvent = createMockEvent({
        body: JSON.stringify({ data: 'test' })
      })
      
      const request = new Request(mockEvent)
      expect(request.body).toEqual({ data: 'test' })
    })

    it('should return raw body when JSON parsing fails', () => {
      const rawBody = 'plain text body'
      const mockEvent = createMockEvent({
        body: rawBody
      })
      
      const request = new Request(mockEvent)
      expect(request.body).toBe(rawBody)
    })

    it('should handle empty body', () => {
      const mockEvent = createMockEvent({
        body: ''
      })
      
      const request = new Request(mockEvent)
      expect(request.body).toBe('')
    })
  })
})
