import 'reflect-metadata'

// This decorator is used to inject a parameter from the path parameters of the request
export function Param(paramName: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey === undefined) {
      throw new Error('Param decorator can only be used on a method parameter')
    }
    const existingParams =
      Reflect.getMetadata('params', target, propertyKey) || []
    existingParams.push({ index: parameterIndex, name: paramName })
    Reflect.defineMetadata('params', existingParams, target, propertyKey)
  }
}
