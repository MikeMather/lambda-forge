import { HttpResponse, Lambda, LambdaForge } from 'lambda-forge';

const forge = new LambdaForge({
  services: []
});

@Lambda
class HelloHandler {
  async main(event: any) {
    return HttpResponse.ok();
  }
}

export const hello = forge.createHandler(HelloHandler);
