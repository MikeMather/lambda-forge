import 'reflect-metadata'
import { LambdaForge } from '../lambda.factory'
import { MockDto, MockLambda, MockService } from './__mocks__/mocks'
import { container } from 'tsyringe'
import { Request } from '../../http/Request'
import { Response } from '../../http/Response'
import MockMiddleware from './__mocks__/mockMiddleware'

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
      const event = { body: null }
      const req = new Request(event as any)
      expect(() => lambdaForge.handleBodyInjection({ index: 0, bodyType: class {} }, req)).toThrow('Missing body in request')
    })

    it('should throw error if validation fails', () => {
      const event = { body: JSON.stringify({ name: 123 }) }
      const req = new Request(event as any)
      expect(() => lambdaForge.handleBodyInjection({ index: 0, bodyType: MockDto }, req)).toThrow('Validation error')
    })

    it('should return body instance if validation passes', () => {
      const event = { body: JSON.stringify({ name: 'John' }) }
      const req = new Request(event as any)
      const result = lambdaForge.handleBodyInjection({ index: 0, bodyType: MockDto }, req)
      expect(result).toEqual({ name: 'John' })
    })
  })

  describe('createHandler', () => {
    it('should return handler function', () => {
      const handler = lambdaForge.createHandler(MockLambda)
      expect(handler).toBeInstanceOf(Function)
    })
  })

  describe('executeMiddleware', () => {
    it('should execute middleware', async () => {
      jest.setTimeout(30000)
      const middleware = new MockMiddleware()
      const req = new Request({} as any)
      const res = new Response()
      const next = jest.fn()
      await lambdaForge.executeMiddlewares(req, res, [middleware])
      expect(req.context.user).not.toBeNull()
    })
  })
})
