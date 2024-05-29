import 'reflect-metadata'

export function Event(target: any, propertyKey: string | symbol, parameterIndex: number) {
  Reflect.defineMetadata('event', { index: parameterIndex }, target, propertyKey)
}
