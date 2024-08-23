import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { RestLambdaHandler } from '../interfaces/rest-lambda-handler.interface';
import { BodyParam } from '../decorators/body.decorator';
import { ForgeMiddleware } from '../interfaces/Middleware.interface';
import { Request } from '../http/Request';
import { Response } from '../http/Response';
type ParamMetadata = {
    services: any[];
    middlewares?: (new (...args: any[]) => ForgeMiddleware)[];
};
export declare class LambdaForge {
    private container;
    private services;
    middlewares: (new (...args: any[]) => ForgeMiddleware)[];
    constructor({ services, middlewares }: ParamMetadata);
    validationErrorFormatter(errors: any): string[];
    handleBodyInjection(bodyParameter: BodyParam, req: Request): any;
    validateReturn(result: any, returnType: any, returnsMany: boolean): void;
    executeMiddlewares(req: Request, res: Response, middlewares: (new (...args: any[]) => ForgeMiddleware)[]): Promise<void>;
    runPreExecutionHooks(): Promise<void>;
    createHandler(HandlerClass: new (...args: any[]) => RestLambdaHandler): (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult | void>;
}
export {};
