import 'reflect-metadata'

// This decorator is used to inject the raw event object
export function Event(
  target: any,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  const existingEventParameters: number[] =
    Reflect.getOwnMetadata('eventParameters', target, propertyKey) || []
  existingEventParameters.push(parameterIndex)
  Reflect.defineMetadata(
    'eventParameters',
    existingEventParameters,
    target,
    propertyKey
  )
}
