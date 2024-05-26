import 'reflect-metadata';
import { Lambda, RestLambdaHandler, Param, NotFoundError, HttpResponse, Inject, Query } from 'lambda-restful';
import { APIGatewayProxyResult } from 'aws-lambda';
import { appFactory } from './app';
import { DogsService } from './dogs.service';

@Lambda
class GetDogHandler implements RestLambdaHandler {

  constructor(@Inject(DogsService) private dogService: DogsService) {}

  public async main(@Param('id') id: string): Promise<APIGatewayProxyResult> {
    const dog = this.dogService.getDogById(parseInt(id));
    if (!dog) {
      throw new NotFoundError('Dog not found');
    }
    return HttpResponse.ok(dog);
  }
}

export const handler = appFactory.createHandler(GetDogHandler);