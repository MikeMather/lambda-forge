import { container, DependencyContainer } from 'tsyringe'
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult
} from 'aws-lambda'
import { RestLambdaHandler } from '../interfaces/rest-lambda-handler.interface'
import { validateSync } from 'class-validator'
import { BodyParam } from '../decorators/body.decorator'
import ValidationError from '../errors/validation.error'
import GenericError from '../errors/generic.error'

type ParamMetadata = {
  services: any[]
}

export class LambdaFactory {
  private container: DependencyContainer

  constructor({ services }: ParamMetadata) {
    this.container = container
    services.forEach((service) => {
      this.container.register(service, { useClass: service })
    })
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
      throw new ValidationError(
        'Validation error',
        this.validationErrorFormatter(errors)
      )
    } else {
      return bodyInstance
    }
  }

  createHandler(HandlerClass: new (...args: any[]) => RestLambdaHandler) {
    const handlerInstance = container.resolve(HandlerClass)

    return async (
      event: APIGatewayProxyEvent,
      context: Context
    ): Promise<APIGatewayProxyResult> => {
      try {
        const method = handlerInstance.main
        const paramsMeta =
          Reflect.getMetadata('params', handlerInstance, 'main') || []
        const bodyMeta = Reflect.getMetadata('body', handlerInstance, 'main')
        const queryMeta = Reflect.getMetadata('query', handlerInstance, 'main')

        const args: any[] = []

        // Inject body parameter
        if (bodyMeta) {
          args[bodyMeta.index] = this.handleBodyInjection(bodyMeta, event)
        }

        // Inject query parameters
        if (queryMeta) {
          args[queryMeta.index] = event.queryStringParameters
        }

        // Extract path parameters
        if (paramsMeta.length > 0) {
          paramsMeta.forEach((param: { index: number; name: string }) => {
            args[param.index] = event.pathParameters
              ? event.pathParameters[param.name]
              : undefined
          })
        }

        return await method.apply(handlerInstance, args)
      } catch (error) {
        if (error instanceof GenericError) {
          return error.toResponse()
        } else {
          return new GenericError('Internal server error').toResponse()
        }
      }
    }
  }
}
