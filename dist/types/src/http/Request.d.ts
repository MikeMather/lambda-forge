import { APIGatewayProxyEvent } from "aws-lambda";
export declare class Request {
    query: {
        [key: string]: string | undefined;
    };
    params: {
        [key: string]: string | undefined;
    };
    headers: {
        [key: string]: string | undefined;
    };
    body: any;
    context: {
        [key: string]: any;
    };
    constructor(event: APIGatewayProxyEvent);
}
