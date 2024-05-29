## Installation

To get started with Lambda Forge, install the library using npm:

```terminal
npm install lambda-forge reflect-metadata class-validator
```

Make sure to also install reflect-metadata as it is a peer dependency required for decorators to work properly, and class-validator to enable schema validation.

## Getting Started

Here's a quick example of how to create and configure a Lambda function using Lambda Forge:

In `app.ts`

```typescript
import { LambdaForge } from 'lambda-forge'

export const forge = new LambdaForge({
  services: [DogsService]
})
```

In `CreateDogHandler.ts`

```typescript
import 'reflect-metadata'
import { Lambda, Body, HttpResponse, Inject, LambdaForge } from 'lambda-forge'
import { DogsService } from './dogs.service'
import { CreateDogDTO } from './DTOs'
import { forge } from './app'

@Lambda
class CreateDogHandler {
  constructor(@Inject(DogsService) private dogService: DogsService) {}

  public async main(@Body(CreateDogDTO) dog: CreateDogDTO) {
    const result = this.dogService.createDog(dog)
    return HttpResponse.created(result)
  }
}

export const handler = forge.createHandler(CreateDogHandler)
```
