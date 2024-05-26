export function Query() {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    Reflect.defineMetadata(
      'query',
      { index: parameterIndex },
      target,
      propertyKey
    )
  }
}
