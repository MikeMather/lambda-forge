import 'reflect-metadata';
import { Lambda, RestLambdaHandler, Param, NotFoundError, Inject, Req, Request, UseMiddlewares } from 'lambda-forge';
import { appFactory } from './app';
import { DogsService } from './dogs.service';
import { ExampleMiddleware } from './middleware';

@Lambda
export class GetDogHandler implements RestLambdaHandler {

  constructor(@Inject(DogsService) private dogService: DogsService) {}

  @UseMiddlewares([ExampleMiddleware])
  public async main(@Param('id', [parseInt]) id: number, @Req() req: Request): Promise<any> {
    const dog = this.dogService.getDogById(id);
    if (!dog) {
      throw new NotFoundError('Dog not found');
    }
    return dog;
  }
}

export const handler = appFactory.createHandler(GetDogHandler);