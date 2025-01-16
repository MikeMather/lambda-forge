import 'reflect-metadata'
import { jest, describe, it, expect } from '@jest/globals'
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  ServiceUnavailable,
  ConflictError,
  UnprocessableEntityError
} from '../httpErrors'
import GenericError from '../generic.error'

describe('HTTP Errors', () => {
  const testMessage = 'Test error message'

  describe('NotFoundError', () => {
    it('should create error with correct properties', () => {
      const error = new NotFoundError(testMessage)
      expect(error).toBeInstanceOf(GenericError)
      expect(error.name).toBe('NotFoundError')
      expect(error.statusCode).toBe(404)
      expect(error.message).toBe(testMessage)
    })
  })

  describe('BadRequestError', () => {
    it('should create error with correct properties', () => {
      const error = new BadRequestError(testMessage)
      expect(error).toBeInstanceOf(GenericError)
      expect(error.name).toBe('BadRequestError')
      expect(error.statusCode).toBe(400)
      expect(error.message).toBe(testMessage)
    })
  })

  describe('UnauthorizedError', () => {
    it('should create error with correct properties', () => {
      const error = new UnauthorizedError(testMessage)
      expect(error).toBeInstanceOf(GenericError)
      expect(error.name).toBe('UnauthorizedError')
      expect(error.statusCode).toBe(401)
      expect(error.message).toBe(testMessage)
    })
  })

  describe('ForbiddenError', () => {
    it('should create error with correct properties', () => {
      const error = new ForbiddenError(testMessage)
      expect(error).toBeInstanceOf(GenericError)
      expect(error.name).toBe('ForbiddenError')
      expect(error.statusCode).toBe(403)
      expect(error.message).toBe(testMessage)
    })
  })

  describe('InternalServerError', () => {
    it('should create error with correct properties', () => {
      const error = new InternalServerError(testMessage)
      expect(error).toBeInstanceOf(GenericError)
      expect(error.name).toBe('InternalServerError')
      expect(error.statusCode).toBe(500)
      expect(error.message).toBe(testMessage)
    })
  })

  describe('ServiceUnavailable', () => {
    it('should create error with correct properties', () => {
      const error = new ServiceUnavailable(testMessage)
      expect(error).toBeInstanceOf(GenericError)
      expect(error.name).toBe('ServiceUnavailable')
      expect(error.statusCode).toBe(503)
      expect(error.message).toBe(testMessage)
    })
  })

  describe('ConflictError', () => {
    it('should create error with correct properties', () => {
      const error = new ConflictError(testMessage)
      expect(error).toBeInstanceOf(GenericError)
      expect(error.name).toBe('ConflictError')
      expect(error.statusCode).toBe(409)
      expect(error.message).toBe(testMessage)
    })
  })

  describe('UnprocessableEntityError', () => {
    it('should create error with correct properties', () => {
      const error = new UnprocessableEntityError(testMessage)
      expect(error).toBeInstanceOf(GenericError)
      expect(error.name).toBe('UnprocessableEntityError')
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe(testMessage)
    })
  })

  // Test HTTP response format for one error type as they all inherit from GenericError
  it('should create proper HTTP response', () => {
    const error = new NotFoundError(testMessage)
    const response = error.toResponse()
    
    expect(response.statusCode).toBe(404)
    expect(response.body).toBe(JSON.stringify({
      message: testMessage
    }))
  })
})
