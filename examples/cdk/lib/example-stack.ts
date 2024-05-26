import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class ExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const createHandler = new NodejsFunction(this, 'createDogHandler', {
      entry: 'lib/handlers/createDogHandler.ts',
      handler: 'handler',
      bundling: {
        minify: true,
        sourceMap: true,
        target: 'es2020'
      }
    });

    const getHandler = new NodejsFunction(this, 'getDogHandler', {
      entry: 'lib/handlers/getDogHandler.ts',
      handler: 'handler',
      bundling: {
        minify: true,
        sourceMap: true,
        target: 'es2020'
      }
    });

    const api = new apigateway.RestApi(this, 'dogs-api', {
      restApiName: 'Dogs Service',
      description: 'This service serves dogs.'
    });

    const dogs = api.root.addResource('dogs');
    dogs.addMethod('POST', new apigateway.LambdaIntegration(createHandler));
    dogs.addResource('{id}').addMethod('GET', new apigateway.LambdaIntegration(getHandler));
  }
}
