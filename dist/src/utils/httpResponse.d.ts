import { APIGatewayProxyResult } from 'aws-lambda';
export declare class HttpResponse {
    statusCode: number;
    body: string;
    constructor(statusCode: number, body?: {
        [key: string]: any;
    } | string);
    toResponse(): APIGatewayProxyResult;
    static ok(body?: any): HttpResponse;
    static created(body: any): HttpResponse;
    static noContent(): HttpResponse;
}
