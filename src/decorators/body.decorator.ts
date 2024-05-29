import 'reflect-metadata'

export type BodyParam = {
  index: number
  bodyType: any
}

export function Body(dto: new (...args: any[]) => any): any {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    Reflect.defineMetadata('body', { index: parameterIndex, bodyType: dto }, target, propertyKey)
  }
}
