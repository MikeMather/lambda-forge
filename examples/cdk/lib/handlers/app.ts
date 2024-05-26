import { LambdaFactory } from 'lambda-restful';
import { DogsService } from './dogs.service';


export const appFactory = new LambdaFactory({
  services: [
    DogsService
  ]
});