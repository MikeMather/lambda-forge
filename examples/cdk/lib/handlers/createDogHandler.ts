import 'reflect-metadata';
import { Lambda, RestLambdaHandler, Body, HttpResponse, Inject } from 'lambda-restful';
import { appFactory } from './app';
import { DogsService } from './dogs.service';
import { CreateDogDTO } from './DTOs';

@Lambda
class CreateDogHandler implements RestLambdaHandler {

  constructor(@Inject(DogsService) private dogService: DogsService) {}

  public async main(@Body(CreateDogDTO) dog: CreateDogDTO) {
    const result = this.dogService.createDog(dog);
    return HttpResponse.created(result);
  }
}

export const handler = appFactory.createHandler(CreateDogHandler);