import { APIGatewayProxyEvent } from 'aws-lambda';
export interface ForgeMiddleware {
    use(event: APIGatewayProxyEvent, context: CustomContextType, next: () => Promise<void>): Promise<void>;
}
export type CustomContextType = {
    [key: string]: any;
};
