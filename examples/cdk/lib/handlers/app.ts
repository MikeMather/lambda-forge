import { LambdaForge } from 'lambda-forge';
import { DogsService } from './dogs.service';


export const appFactory = new LambdaForge({
  services: [DogsService]
});