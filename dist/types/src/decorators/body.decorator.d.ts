import 'reflect-metadata';
export type BodyParam = {
    index: number;
    bodyType: any;
};
/**
 * Decorator to inject the body of the request into the handler method
 * @param dto The DTO class to validate the body against
 * @returns The decorated class
 */
export declare function Body(dto: new (...args: any[]) => any): (target: any, propertyKey: string, parameterIndex: number) => void;
