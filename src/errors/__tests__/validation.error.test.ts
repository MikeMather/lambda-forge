import ValidationError from '../validation.error'
import GenericError from '../generic.error'

describe('ValidationError', () => {
  it('should create a validation error with the correct properties', () => {
    const errors = ['Field1 is required', 'Field2 is invalid']
    const error = new ValidationError('Validation failed', errors)
    
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(GenericError)
    expect(error).toBeInstanceOf(ValidationError)
    expect(error.name).toBe('ValidationError')
    expect(error.statusCode).toBe(400)
    expect(error.message).toBe('Validation failed')
    expect(error.errors).toEqual(errors)
  })

  it('should create a proper HTTP response with validation errors', () => {
    const errors = ['Field1 is required', 'Field2 is invalid']
    const error = new ValidationError('Validation failed', errors)
    const response = error.toResponse()
    
    expect(response.statusCode).toBe(400)
    expect(response.body).toBe(JSON.stringify({
      message: 'Validation failed',
      errors: errors
    }))
  })
})
