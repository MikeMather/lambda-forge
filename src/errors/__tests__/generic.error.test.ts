import 'reflect-metadata'
import { jest, describe, it, expect } from '@jest/globals'
import GenericError from '../generic.error'

describe('GenericError', () => {
  it('should create a generic error with the correct properties', () => {
    const error = new GenericError('TestError', 400, 'Test message')
    
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(GenericError)
    expect(error.name).toBe('TestError')
    expect(error.statusCode).toBe(400)
    expect(error.message).toBe('Test message')
  })

  it('should create a proper HTTP response', () => {
    const error = new GenericError('TestError', 400, 'Test message')
    const response = error.toResponse()
    
    expect(response.statusCode).toBe(400)
    expect(response.body).toBe('{"message":"Test message"}')
  })
})
