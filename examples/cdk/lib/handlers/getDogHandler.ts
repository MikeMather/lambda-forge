import 'reflect-metadata';
import { Lambda, RestLambdaHandler, Param, NotFoundError, HttpResponse } from 'lambda-restful';
import { APIGatewayProxyResult } from 'aws-lambda';
import { inject } from 'tsyringe';
import { appFactory } from './app';
import { DogsService } from './dogs.service';

@Lambda
class GetDogHandler implements RestLambdaHandler {

  constructor(@inject(DogsService) private dogService: DogsService) {}

  public async main(@Param('id') id: string): Promise<APIGatewayProxyResult> {
    const dog = this.dogService.getDogById(parseInt(id));
    if (!dog) {
      throw new NotFoundError('Dog not found');
    }
    return HttpResponse.ok(dog);
  }
}

export const handler = appFactory.createHandler(GetDogHandler);