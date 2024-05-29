import 'reflect-metadata'
import { LambdaForge } from '../lambda.factory'
import { MockDto, MockLambda, MockService } from './__mocks__/mocks'
import { container } from 'tsyringe'

describe('LambdaForge', () => {
  let lambdaForge: LambdaForge

  beforeEach(() => {
    lambdaForge = new LambdaForge({ services: [] })
  })

  describe('Register services', () => {
    it('should register services', () => {
      const services = [MockService]
      jest.spyOn(container, 'register')
      lambdaForge = new LambdaForge({ services })
      expect(container.register).toHaveBeenCalledWith(MockService, { useClass: MockService })
    })
  })

  describe('validationErrorFormatter', () => {
    it('should format validation errors', () => {
      const errors = [
        {
          constraints: {
            isNotEmpty: 'Name should not be empty'
          }
        }
      ]
      const result = lambdaForge.validationErrorFormatter(errors)
      expect(result).toEqual(['Name should not be empty'])
    })
  })

  describe('handleBodyInjection', () => {
    it('should throw error if body is missing', () => {
      expect(() => lambdaForge.handleBodyInjection({ index: 0, bodyType: class {} }, {})).toThrow('Missing body in request')
    })

    it('should throw error if validation fails', () => {
      const event = { body: JSON.stringify({ name: 123 }) }
      expect(() => lambdaForge.handleBodyInjection({ index: 0, bodyType: MockDto }, event)).toThrow('Validation error')
    })

    it('should return body instance if validation passes', () => {
      const event = { body: JSON.stringify({ name: 'John' }) }
      const result = lambdaForge.handleBodyInjection({ index: 0, bodyType: MockDto }, event)
      expect(result).toEqual({ name: 'John' })
    })
  })

  describe('createHandler', () => {
    it('should return handler function', () => {
      const handler = lambdaForge.createHandler(MockLambda)
      expect(handler).toBeInstanceOf(Function)
    })
  })
})
