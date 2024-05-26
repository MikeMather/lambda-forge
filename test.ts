import 'reflect-metadata';
import { Lambda, LambdaFactory, RestLambdaHandler, Body, Param } from './index';
import { APIGatewayProxyResult } from 'aws-lambda';
import { injectable, inject } from 'tsyringe';
import { IsString } from 'class-validator';
import { HttpResponse } from './src/utils/httpResponse';

export class MyDto {
  @IsString()
  name!: string;
}

@injectable()
export class MyService {
  public doSomething(dto: MyDto) {
    // Business logic here
    return dto;
  }
}

@Lambda
class MyLambdaHandler implements RestLambdaHandler {

  constructor(@inject(MyService) private myService: MyService) {}

  public async main(@Param("id") id: string): Promise<APIGatewayProxyResult> {
    return new HttpResponse(200, {id});
  }
}

const appFactory = new LambdaFactory({
  services: [
    MyService
  ]
});

const handler = appFactory.createHandler(MyLambdaHandler);

const event = {
  "resource": "/dogs/{id}",
  "path": "/dogs/1",
  "httpMethod": "GET",
  "headers": {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9,en-CA;q=0.8",
    "cache-control": "max-age=0",
    "CloudFront-Forwarded-Proto": "https",
    "CloudFront-Is-Desktop-Viewer": "true",
    "CloudFront-Is-Mobile-Viewer": "false",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Tablet-Viewer": "false",
    "CloudFront-Viewer-ASN": "855",
    "CloudFront-Viewer-Country": "CA",
    "dnt": "1",
    "Host": "ea52b9l0o6.execute-api.us-east-1.amazonaws.com",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0",
    "Via": "2.0 b7f480ddbe20bc339525f8e43ddce81a.cloudfront.net (CloudFront)",
    "X-Amz-Cf-Id": "XD37EnKoBl1RRJZrRkSKhszOYP4HSuoZcDA13_TvABp5y41wqRGcVw==",
    "X-Amzn-Trace-Id": "Root=1-66524a62-466c840238c056303579592a",
    "X-Forwarded-For": "159.2.28.152, 64.252.182.70",
    "X-Forwarded-Port": "443",
    "X-Forwarded-Proto": "https"
  },
  "multiValueHeaders": {
    "Accept": [
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
    ],
    "Accept-Encoding": [ "gzip, deflate, br, zstd" ],
    "Accept-Language": [ "en-US,en;q=0.9,en-CA;q=0.8" ],
    "cache-control": [ "max-age=0" ],
    "CloudFront-Forwarded-Proto": [ "https" ],
    "CloudFront-Is-Desktop-Viewer": [ "true" ],
    "CloudFront-Is-Mobile-Viewer": [ "false" ],
    "CloudFront-Is-SmartTV-Viewer": [ "false" ],
    "CloudFront-Is-Tablet-Viewer": [ "false" ],
    "CloudFront-Viewer-ASN": [ "855" ],
    "CloudFront-Viewer-Country": [ "CA" ],
    "dnt": [ "1" ],
    "Host": [ "ea52b9l0o6.execute-api.us-east-1.amazonaws.com" ],
    "sec-ch-ua": [
      "\"Microsoft Edge\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\""
    ],
    "sec-ch-ua-mobile": [ "?0" ],
    "sec-ch-ua-platform": [ "\"Windows\"" ],
    "sec-fetch-dest": [ "document" ],
    "sec-fetch-mode": [ "navigate" ],
    "sec-fetch-site": [ "none" ],
    "sec-fetch-user": [ "?1" ],
    "upgrade-insecure-requests": [ "1" ],
    "User-Agent": [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0"
    ],
    "Via": [
      "2.0 b7f480ddbe20bc339525f8e43ddce81a.cloudfront.net (CloudFront)"
    ],
    "X-Amz-Cf-Id": [ "XD37EnKoBl1RRJZrRkSKhszOYP4HSuoZcDA13_TvABp5y41wqRGcVw==" ],
    "X-Amzn-Trace-Id": [ "Root=1-66524a62-466c840238c056303579592a" ],
    "X-Forwarded-For": [ "159.2.28.152, 64.252.182.70" ],
    "X-Forwarded-Port": [ "443" ],
    "X-Forwarded-Proto": [ "https" ]
  },
  "queryStringParameters": null,
  "multiValueQueryStringParameters": null,
  "pathParameters": { "id": "1", "name": "dog" },
  "stageVariables": null,
  "requestContext": {
    "resourceId": "lkgang",
    "resourcePath": "/dogs/{id}",
    "httpMethod": "GET",
    "extendedRequestId": "YWCPfEjhoAMEu9w=",
    "requestTime": "25/May/2024:20:30:26 +0000",
    "path": "/prod/dogs/1",
    "accountId": "878240881681",
    "protocol": "HTTP/1.1",
    "stage": "prod",
    "domainPrefix": "ea52b9l0o6",
    "requestTimeEpoch": 1716669026838,
    "requestId": "c19d1978-5095-4d06-a086-8f1011e9c782",
    "identity": {
      "cognitoIdentityPoolId": null,
      "accountId": null,
      "cognitoIdentityId": null,
      "caller": null,
      "sourceIp": "159.2.28.152",
      "principalOrgId": null,
      "accessKey": null,
      "cognitoAuthenticationType": null,
      "cognitoAuthenticationProvider": null,
      "userArn": null,
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0",
      "user": null
    },
    "domainName": "ea52b9l0o6.execute-api.us-east-1.amazonaws.com",
    "deploymentId": "l6sk4l",
    "apiId": "ea52b9l0o6"
  },
  "body": null,
  "isBase64Encoded": false
}

// @ts-ignore
handler(event, null).then(console.log).catch(console.error);