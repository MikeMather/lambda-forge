import { container, DependencyContainer } from 'tsyringe'
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda'
import { RestLambdaHandler } from '../interfaces/rest-lambda-handler.interface'
import { validateSync } from 'class-validator'
import { BodyParam } from '../decorators/body.decorator'
import ValidationError from '../errors/validation.error'
import GenericError from '../errors/generic.error'
import { HttpResponse } from '../utils/httpResponse'
import { CustomContextType, ForgeMiddleware } from '../interfaces/ForgeMiddleware.interface'

type ParamMetadata = {
  services: any[]
  middlewares?: ForgeMiddleware[]
}

export class LambdaForge {
  private container: DependencyContainer
  middlewares: ForgeMiddleware[]

  constructor({ services, middlewares = [] }: ParamMetadata) {
    this.container = container
    services.forEach((service) => {
      this.container.register(service, { useClass: service })
    })
    this.middlewares = middlewares
  }

  validationErrorFormatter(errors: any): string[] {
    return errors
      .map((error: any) => {
        return Object.values(error.constraints)
      })
      .flat()
  }

  handleBodyInjection(bodyParameter: BodyParam, event: any) {
    if (!event.body) {
      throw new Error('Missing body in request')
    }
    const body = JSON.parse(event.body)
    const bodyType = bodyParameter.bodyType
    const bodyInstance = new bodyType()
    Object.assign(bodyInstance, body)
    const errors = validateSync(bodyInstance)
    if (errors.length > 0) {
      throw new ValidationError('Validation error', this.validationErrorFormatter(errors))
    } else {
      return bodyInstance
    }
  }

  validateReturn(result: any, returnType: any, returnsMany: boolean) {
    if (returnsMany) {
      if (!Array.isArray(result)) {
        throw new ValidationError('Validation error', ['Expected array'])
      }
      result.forEach((item: any) => {
        const errors = validateSync(item)
        if (errors.length > 0) {
          throw new ValidationError('Validation error', this.validationErrorFormatter(errors))
        }
      })
    } else {
      const errors = validateSync(result)
      if (errors.length > 0) {
        throw new ValidationError('Validation error', this.validationErrorFormatter(errors))
      }
    }
  }

  createHandler(HandlerClass: new (...args: any[]) => RestLambdaHandler) {
    const handlerInstance = container.resolve(HandlerClass)

    return async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult | void> => {
      try {
        const method = handlerInstance.main
        const paramsMeta = Reflect.getMetadata('params', handlerInstance, 'main') || []
        const bodyMeta = Reflect.getMetadata('body', handlerInstance, 'main')
        const queryMeta = Reflect.getMetadata('query', handlerInstance, 'main')
        const eventMeta = Reflect.getMetadata('event', handlerInstance, 'main')
        const returnType = Reflect.getMetadata('returns', handlerInstance, 'main')
        const returnStatusCode = Reflect.getMetadata('statusCode', handlerInstance, 'main')
        const returnsMany = Reflect.getMetadata('returnsMany', handlerInstance, 'main')
        const customContextMeta = Reflect.getMetadata('context', handlerInstance, 'main')

        const args: any[] = []

        // Execute middlewares
        const customContext: CustomContextType = {}
        for (let i = 0; i < this.middlewares.length; i++) {
          const middleware = this.middlewares[i]
          await middleware.use(event, customContext, async () => {
            if (i === this.middlewares.length - 1) {
              return await method.apply(handlerInstance, args)
            }
          })
        }

        // Inject body parameter
        if (bodyMeta) {
          args[bodyMeta.index] = this.handleBodyInjection(bodyMeta, event)
        }

        // Inject query parameters
        if (queryMeta) {
          args[queryMeta.index] = event.queryStringParameters || {}
        }

        // Extract path parameters
        if (paramsMeta.length > 0) {
          paramsMeta.forEach((param: { index: number; name: string }) => {
            args[param.index] = event.pathParameters ? event.pathParameters[param.name] : undefined
          })
        }

        // Inject event object
        if (eventMeta) {
          args[eventMeta.index] = event
        }

        const result = await method.apply(handlerInstance, args)
        if (returnType === undefined) {
          return new HttpResponse(200, result).toResponse()
        }
        this.validateReturn(result, returnType, returnsMany)
        return new HttpResponse(returnStatusCode, result).toResponse()
      } catch (error) {
        if (error instanceof GenericError) {
          return error.toResponse()
        } else {
          console.log(error)
          throw new GenericError('Internal server error')
        }
      }
    }
  }
}
