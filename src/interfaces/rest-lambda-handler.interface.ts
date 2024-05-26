import { APIGatewayProxyResult } from 'aws-lambda';

export interface RestLambdaHandler {
  main(...args: any[]): Promise<APIGatewayProxyResult>;
}
