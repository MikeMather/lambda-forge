import { isValidStatusCode } from '../utils/httpStatus'

/**
 * Specifies the return type of the function. Uses class validator to ensure the return type is correct.
 * @returns
 */
export function Returns(statusCode: number, validatorCls: any, options?: { many?: boolean }): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    if (validatorCls === null || validatorCls === undefined || typeof validatorCls !== 'function') {
      throw new Error('Invalid validator class for @Returns() decorator. Ensure that the class is imported and passed correctly.')
    }
    if (!isValidStatusCode(statusCode)) {
      throw new Error('Invalid status code for @Returns() decorator. Ensure that the status code is a valid HTTP status code.')
    }
    Reflect.defineMetadata('returns', validatorCls, target, propertyKey)
    Reflect.defineMetadata('statusCode', statusCode, target, propertyKey)
    Reflect.defineMetadata('returnsMany', !!options?.many, target, propertyKey)
  }
}
