import 'reflect-metadata'

export function Res() {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    Reflect.defineMetadata('response', { index: parameterIndex }, target, propertyKey)
  }
}
