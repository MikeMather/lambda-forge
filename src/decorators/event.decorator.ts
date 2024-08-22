import 'reflect-metadata'

export function Event(): ParameterDecorator {
  return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number): void => {
    if (propertyKey === undefined) {
      throw new Error('Event decorator can only be used on a method parameter')
    }
    Reflect.defineMetadata('event', { index: parameterIndex }, target, propertyKey)
  }
}
