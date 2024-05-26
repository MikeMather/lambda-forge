import { injectable } from 'tsyringe';
import dogs from './dogs';
import { CreateDogDTO } from './DTOs';

@injectable()
export class DogsService {

  public getDogById(id: number) {
    return dogs.find(dog => dog.id === id);
  }

  public createDog(dog: CreateDogDTO) {
    const newDog = {
      id: dogs.length + 1,
      ...dog
    };
    dogs.push(newDog);
    return newDog;
  }
}