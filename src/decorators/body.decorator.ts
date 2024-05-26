import 'reflect-metadata'

export type BodyParam = {
  index: number
  bodyType: any
}

// This decorator is used to inject the body of the request and validate it using class-validator
export function Body<T>(dto: new (...args: any[]) => T) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    Reflect.defineMetadata(
      'body',
      { index: parameterIndex, bodyType: dto },
      target,
      propertyKey
    )
  }
}
