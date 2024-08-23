import 'reflect-metadata';
import { Lambda, Body, HttpResponse, Inject } from 'lambda-forge';
import { appFactory } from './app';
import { DogsService } from './dogs.service';
import { CreateDogDTO } from './DTOs';

@Lambda()
class CreateDogHandler {

  constructor(@Inject(DogsService) private dogService: DogsService) {}

  public async main(@Body(CreateDogDTO) dog: CreateDogDTO) {
    const result = this.dogService.createDog(dog);
    return HttpResponse.created(result);
  }
}

export const handler = appFactory.createHttpHandler(CreateDogHandler);