import 'reflect-metadata'
import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import { Response } from '../Response'

describe('Response', () => {
  let response: Response

  beforeEach(() => {
    response = new Response()
  })

  describe('status', () => {
    it('should set status code and return this for chaining', () => {
      const result = response.status(200)
      
      expect(response.statusCode).toBe(200)
      expect(result).toBe(response)
    })
  })

  describe('setHeader', () => {
    it('should initialize headers object if undefined', () => {
      response.setHeader('content-type', 'application/json')
      
      expect(response.headers).toBeDefined()
      expect(response.headers['content-type']).toBe('application/json')
    })

    it('should add multiple headers', () => {
      response
        .setHeader('content-type', 'application/json')
        .setHeader('x-custom', true)
        .setHeader('x-count', 42)
      
      expect(response.headers).toEqual({
        'content-type': 'application/json',
        'x-custom': true,
        'x-count': 42
      })
    })

    it('should return this for chaining', () => {
      const result = response.setHeader('content-type', 'application/json')
      expect(result).toBe(response)
    })
  })

  describe('send', () => {
    it('should return APIGatewayProxyResult with correct structure', () => {
      response
        .status(201)
        .setHeader('content-type', 'application/json')
      response.body = JSON.stringify({ message: 'created' })

      const result = response.send()

      expect(result).toEqual({
        statusCode: 201,
        headers: {
          'content-type': 'application/json'
        },
        body: '{"message":"created"}'
      })
    })

    it('should handle response without headers', () => {
      response.status(204)
      
      const result = response.send()

      expect(result).toEqual({
        statusCode: 204,
        headers: undefined,
        body: undefined
      })
    })
  })
})
