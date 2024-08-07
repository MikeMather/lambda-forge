import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { RestLambdaHandler } from '../interfaces/rest-lambda-handler.interface';
import { BodyParam } from '../decorators/body.decorator';
import { ForgeMiddleware } from '../interfaces/ForgeMiddleware.interface';
type ParamMetadata = {
    services: any[];
    middlewares?: ForgeMiddleware[];
};
export declare class LambdaForge {
    private container;
    middlewares: ForgeMiddleware[];
    constructor({ services, middlewares }: ParamMetadata);
    validationErrorFormatter(errors: any): string[];
    handleBodyInjection(bodyParameter: BodyParam, event: any): any;
    validateReturn(result: any, returnType: any, returnsMany: boolean): void;
    createHandler(HandlerClass: new (...args: any[]) => RestLambdaHandler): (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult | void>;
}
export {};
