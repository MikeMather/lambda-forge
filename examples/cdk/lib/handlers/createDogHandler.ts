import 'reflect-metadata';
import { Lambda, RestLambdaHandler, Body, HttpResponse } from 'lambda-restful';
import { inject } from 'tsyringe';
import { appFactory } from './app';
import { DogsService } from './dogs.service';
import { CreateDogDTO } from './DTOs';

@Lambda
class CreateDogHandler implements RestLambdaHandler {

  constructor(@inject(DogsService) private dogService: DogsService) {}

  public async main(@Body(CreateDogDTO) dog: CreateDogDTO) {
    const result = this.dogService.createDog(dog);
    return HttpResponse.created(result);
  }
}

export const handler = appFactory.createHandler(CreateDogHandler);