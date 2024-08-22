import 'reflect-metadata'

export function Req() {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    Reflect.defineMetadata('request', { index: parameterIndex }, target, propertyKey)
  }
}
