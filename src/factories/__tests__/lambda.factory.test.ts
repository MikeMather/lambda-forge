import 'reflect-metadata'
import { LambdaForge } from '../lambda.factory'
import { MockDto, MockLambda, MockService, MockSimplifiedLambda } from './__mocks__/mocks'
import { container } from '@launchtray/tsyringe-async'
import { Request } from '../../http/Request'
import { Response } from '../../http/Response'
import MockMiddleware from './__mocks__/mockMiddleware'

describe('LambdaForge', () => {
  let lambdaForge: LambdaForge

  beforeEach(() => {
    lambdaForge = new LambdaForge({ services: [MockService] })
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
    it('should return http handler function', () => {
      const handler = lambdaForge.createHttpHandler(MockLambda)
      expect(handler).toBeInstanceOf(Function)
    })

    it('should return simplified handler function', () => {
      const handler = lambdaForge.createHandler(MockSimplifiedLambda)
      expect(handler).toBeInstanceOf(Function)
    })

    it('should run a handler function', async () => {
      const handler = await new LambdaForge({ services: [MockService] }).createHttpHandler(MockLambda)
      await handler({} as any, {} as any)
    })
  })

  describe('executeMiddleware', () => {
      it('should execute middleware', async () => {
        jest.setTimeout(30000)
        const req = new Request({} as any)
        const res = new Response()
        await lambdaForge.executeMiddlewares(req, res, [MockMiddleware])
        expect(req.context.user).not.toBeNull()
      })

      it('should handle middleware errors', async () => {
        const ErrorMiddleware = class {
          async use(_req: Request, _res: Response, next: (error?: Error) => void) {
            next(new Error('Middleware error'))
          }
        }
        
        const req = new Request({} as any)
        const res = new Response()
        
        await expect(lambdaForge.executeMiddlewares(req, res, [ErrorMiddleware]))
          .rejects.toThrow('Middleware error')
      })
    })

    describe('validateReturn', () => {
      class ValidReturnType {
        name: string = 'test'
      }

      it('should validate single return value', () => {
        const result = new ValidReturnType()
        expect(() => lambdaForge.validateReturn(result, ValidReturnType, false))
          .not.toThrow()
      })

      it('should validate array return value when returnsMany is true', () => {
        const result = [new ValidReturnType()]
        expect(() => lambdaForge.validateReturn(result, ValidReturnType, true))
          .not.toThrow()
      })

      it('should throw error for non-array when returnsMany is true', () => {
        const result = new ValidReturnType()
        expect(() => lambdaForge.validateReturn(result, ValidReturnType, true))
          .toThrow('Validation error')
      })
    })

    describe('formatResponseBody', () => {
      it('should return string as-is', () => {
        const result = lambdaForge.formatResponseBody('test string')
        expect(result).toBe('test string')
      })

      it('should convert Buffer to base64 string', () => {
        const buffer = Buffer.from('test buffer')
        const result = lambdaForge.formatResponseBody(buffer)
        expect(result).toBe(buffer.toString('base64'))
      })

      it('should return other types as-is', () => {
        const obj = { key: 'value' }
        const result = lambdaForge.formatResponseBody(obj)
        expect(result).toBe(obj)
      })
    })
})
