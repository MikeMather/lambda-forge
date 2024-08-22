import { LambdaForge } from 'lambda-forge';
import { DogsService } from './dogs.service';
import { CorsMiddleware } from './middleware';


export const appFactory = new LambdaForge({
  services: [DogsService],
  middlewares: [
    CorsMiddleware
  ]
});