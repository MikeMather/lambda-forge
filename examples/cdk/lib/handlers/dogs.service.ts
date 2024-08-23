import { Inject, Service } from 'lambda-forge';
import dogs from './dogs';
import { CreateDogDTO } from './DTOs';
import { DbService } from './db.service';

@Service()
export class DogsService {

  constructor(@Inject(DbService) private dbService: DbService) {}

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

  public getFirstDog() {
    return dogs[0];
  }
}