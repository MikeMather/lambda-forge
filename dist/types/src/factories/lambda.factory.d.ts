import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { LambdaHandler } from '../interfaces/LambdaHandler.interface';
import { BodyParam } from '../decorators/body.decorator';
import { Request } from '../http/Request';
import { Response } from '../http/Response';
import { ForgeMiddleware } from '../interfaces';
type ForgeOptions = {
    services: any[];
    middlewares?: (new (...args: any[]) => ForgeMiddleware)[];
};
export declare class LambdaForge {
    private container;
    private services;
    middlewares: (new (...args: any[]) => ForgeMiddleware)[];
    constructor({ services, middlewares }: ForgeOptions);
    validationErrorFormatter(errors: any): string[];
    handleBodyInjection(bodyParameter: BodyParam, req: Request): any;
    validateReturn(result: any, returnType: any, returnsMany: boolean): void;
    executeMiddlewares(req: Request, res: Response, middlewares: (new (...args: any[]) => ForgeMiddleware)[]): Promise<void>;
    formatResponseBody(resBody: any): string;
    createHttpHandler(HandlerClass: new (...args: any[]) => LambdaHandler): (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult | void>;
    createHandler(HandlerClass: new (...args: any[]) => LambdaHandler): (event: any, context: any) => Promise<any>;
}
export {};
