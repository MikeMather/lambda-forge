import 'reflect-metadata'

export type BodyParam = {
  index: number
  bodyType: any
}

/**
 * Decorator to inject the request body into a controller action parameter.
 * @param dto The DTO class to validate
 * @returns The parameter decorator
 * @example
 * ```ts
 * class CreateUserDto {
 *  @IsString()
 *  name: string
 * }
 *
 * @Lambda
 * class LambdaHandler {
 *   async main(@Body(CreateUserDto) body: CreateUserDto) {
 *     return body
 *   }
 * }
 * ```
 *
 */
export function Body(dto: new (...args: any[]) => any): any {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    Reflect.defineMetadata('body', { index: parameterIndex, bodyType: dto }, target, propertyKey)
  }
}
