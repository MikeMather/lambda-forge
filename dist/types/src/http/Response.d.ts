import { APIGatewayProxyResult } from 'aws-lambda';
export declare class Response {
    statusCode: number;
    headers: {
        [key: string]: string | boolean | number;
    };
    body: string;
    constructor();
    status(statusCode: number): Response;
    setHeader(key: string, value: string | boolean | number): Response;
    send(): APIGatewayProxyResult;
}
