import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as Cdk from '../lib/example-stack';

test('Lambdas Created', () => {
  const app = new cdk.App();
  const stack = new Cdk.ExampleStack(app, 'MyTestStack');
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::Lambda::Function', 2)
  template.resourceCountIs('AWS::IAM::Role', 3)
  template.resourceCountIs('AWS::Lambda::Permission', 4)
  template.resourceCountIs('AWS::ApiGateway::RestApi', 1)
});
