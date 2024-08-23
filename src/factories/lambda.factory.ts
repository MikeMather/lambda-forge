import { container, DependencyContainer } from '@launchtray/tsyringe-async'
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda'
import { LambdaHandler } from '../interfaces/LambdaHandler.interface'
import { validateSync } from 'class-validator'
import { BodyParam } from '../decorators/body.decorator'
import ValidationError from '../errors/validation.error'
import GenericError from '../errors/generic.error'
import { Request } from '../http/Request'
import { Response } from '../http/Response'
import { ForgeMiddleware } from '../interfaces'
import { InternalServerError } from '../errors'

type ForgeOptions = {
  services: any[]
  middlewares?: (new (...args: any[]) => ForgeMiddleware)[]
}

export class LambdaForge {
  private container: DependencyContainer
  private services: (new (...args: any[]) => any)[]
  middlewares: (new (...args: any[]) => ForgeMiddleware)[]

  constructor({ services, middlewares = [] }: ForgeOptions) {
    this.container = container
    this.services = services
    this.middlewares = middlewares
  }

  validationErrorFormatter(errors: any): string[] {
    return errors
      .map((error: any) => {
        return Object.values(error.constraints)
      })
      .flat()
  }

  handleBodyInjection(bodyParameter: BodyParam, req: Request) {
    if (!req.body) {
      throw new Error('Missing body in request')
    }
    const bodyType = bodyParameter.bodyType
    const bodyInstance = new bodyType()
    Object.assign(bodyInstance, req.body)
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

  async executeMiddlewares(req: Request, res: Response, middlewares: (new (...args: any[]) => ForgeMiddleware)[]) {
    for (const Middleware of middlewares) {
      const middlewareInstance = await this.container.resolve(Middleware)
      await new Promise<void>((resolve, reject) => {
        middlewareInstance.use(req, res, (error: any) => {
          if (error) {
            reject(error)
          } else {
            resolve()
          }
        })
      })
    }
  }

  // runs the preExecution method of all services
  // async runPreExecutionHooks() {
  //   for (const service of this.services) {
  //     if (service.prototype.beforeExecution) {
  //       const serviceInstance = this.container.resolve(service)
  //       await serviceInstance.beforeExecution()
  //     }
  //   }
  // }

  createHandler(HandlerClass: new (...args: any[]) => LambdaHandler) {
    return async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult | void> => {
      const handlerInstance = await container.resolve(HandlerClass)
      try {
        const request = new Request(event)
        const response = new Response()

        const method = handlerInstance.main
        const paramsMeta = Reflect.getMetadata('params', handlerInstance, 'main') || []
        const paramsPipesMeta = Reflect.getMetadata('paramPipes', handlerInstance, 'main') || []
        const bodyMeta = Reflect.getMetadata('body', handlerInstance, 'main')
        const queryMeta = Reflect.getMetadata('query', handlerInstance, 'main')
        const eventMeta = Reflect.getMetadata('event', handlerInstance, 'main')
        const returnType = Reflect.getMetadata('returns', handlerInstance, 'main')
        const returnStatusCode = Reflect.getMetadata('statusCode', handlerInstance, 'main')
        const returnsMany = Reflect.getMetadata('returnsMany', handlerInstance, 'main')
        const requestMeta = Reflect.getMetadata('request', handlerInstance, 'main')
        const middlewares = Reflect.getMetadata('middlewares', handlerInstance, 'main') || []
        const args: any[] = []

        // Inject body parameter
        if (bodyMeta) {
          args[bodyMeta.index] = this.handleBodyInjection(bodyMeta, request)
        }

        // Inject query parameters
        if (queryMeta) {
          args[queryMeta.index] = request.query || {}
        }

        // Extract path parameters and run through pipe functions if any
        if (paramsMeta.length > 0) {
          paramsMeta.forEach((param: { index: number; name: string }) => {
            const pipes = paramsPipesMeta.filter((pipe: { index: number }) => pipe.index === param.index)
            let value = request.params[param.name]
            if (pipes.length > 0) {
              pipes.forEach((pipe: { transform: (p: any) => any }) => {
                value = pipe.transform(value)
              })
            }
            args[param.index] = value
          })
        }

        // Inject raw event object
        if (eventMeta) {
          args[eventMeta.index] = event
        }

        await this.executeMiddlewares(request, response, [...this.middlewares, ...middlewares])

        // Inject request object after middleware
        if (requestMeta) {
          args[requestMeta.index] = request
        }

        const result = await method.apply(handlerInstance, args)
        if (returnType === undefined) {
          response.statusCode = 200
          response.body = JSON.stringify(result)
          return response.send()
        }
        this.validateReturn(result, returnType, returnsMany)
        response.statusCode = returnStatusCode
        response.body = JSON.stringify(result)
        return response.send()
      } catch (error) {
        if (error instanceof GenericError) {
          return error.toResponse()
        } else {
          console.log(error)
          throw new InternalServerError('Internal server error')
        }
      }
    }
  }
}
