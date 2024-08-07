/**
 * Specifies the return type of the function. Uses class validator to ensure the return type is correct.
 * @returns
 */
export declare function Returns(statusCode: number, validatorCls: any, options?: {
    many?: boolean;
}): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
