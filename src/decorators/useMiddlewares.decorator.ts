import 'reflect-metadata'
import { ForgeMiddleware } from '../interfaces/Middleware.interface'

export function UseMiddlewares(middlewares: (new (...args: any[]) => ForgeMiddleware)[]): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('middlewares', middlewares, target, propertyKey)
  }
}
