import 'reflect-metadata'

// This decorator is used to inject the raw event object
export function Event(target: any, propertyKey: string | symbol, parameterIndex: number) {
  Reflect.defineMetadata('event', { index: parameterIndex }, target, propertyKey)
}
