# Lambda Forge

[![Test Badge](https://github.com/github/docs/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/mikemather/lambda-forge)

A TypeScript framework for building structured, maintainable AWS Lambda functions with decorators, dependency injection, and strong typing.

## Features

- **Declarative Programming**: Use decorators to define handlers, inject dependencies, and manage request/response flows
- **Dependency Injection**: Built-in DI container for managing services and dependencies
- **Request Validation**: Automatic request body and parameter validation using class-validator
- **Middleware Support**: Create and chain middleware for cross-cutting concerns
- **Type Safety**: Full TypeScript support with strong typing throughout
- **Framework Agnostic**: Works with AWS CDK, Serverless Framework, or any other deployment tool
- **HTTP Utilities**: Built-in request/response handling for API Gateway events
- **Error Handling**: Structured error handling with built-in HTTP error classes

## Installation

```bash
npm install lambda-forge reflect-metadata class-validator class-transformer
```

Make sure to enable decorator metadata in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Quick Start

### 1. Create a Lambda Factory

```typescript
import { LambdaForge } from 'lambda-forge'
import { MyService } from './services/my.service'

export const forge = new LambdaForge({
  services: [MyService]
})
```

### 2. Define a Service

```typescript
import { Service } from 'lambda-forge'

@Service()
export class MyService {
  async getData(id: string) {
    // Implementation
    return { id, data: 'some data' }
  }
}
```

### 3. Create a Handler

```typescript
import { Lambda, Inject, Param } from 'lambda-forge'
import { MyService } from './my.service'

@Lambda()
class GetDataHandler {
  constructor(@Inject(MyService) private myService: MyService) {}

  async main(@Param('id') id: string) {
    return await this.myService.getData(id)
  }
}

export const handler = forge.createHttpHandler(GetDataHandler)
```

## Core Concepts

### Decorators

#### Handler Decorators
- `@Lambda()`: Marks a class as a Lambda handler
- `@Returns(statusCode, type, options)`: Specifies response type and status code

#### Parameter Decorators

##### @Body(dto)
Extracts and validates the request body against a DTO class.

```typescript
import { IsString, IsEmail } from 'class-validator'

class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}

@Lambda()
class CreateUserHandler {
  async main(@Body(CreateUserDTO) user: CreateUserDTO) {
    // user is validated and typed
    return { id: '123', ...user };
  }
}
```

##### @Param(name)
Extracts path parameters from the request URL. Can include optional transform functions.

```typescript
@Lambda()
class GetUserHandler {
  async main(@Param('id', [parseInt]) id: number) {
    // id is automatically converted to number
    return { id, name: 'John Doe' };
  }
}
```

##### @Query()
Extracts query parameters from the request URL.

```typescript
interface UserFilter {
  role?: string;
  status?: 'active' | 'inactive';
}

@Lambda()
class ListUsersHandler {
  async main(@Query() filter: UserFilter) {
    // filter contains typed query parameters
    // e.g., /users?role=admin&status=active
    return this.userService.findUsers(filter);
  }
}
```

##### @Event()
Injects the raw Lambda event object.

```typescript
@Lambda()
class RawEventHandler {
  async main(@Event() event: APIGatewayProxyEvent) {
    // Access the raw event object
    console.log('Request Headers:', event.headers);
    return { received: true };
  }
}
```

##### @Req()
Injects the Request object for accessing request properties.

```typescript
@Lambda()
class RequestHandler {
  async main(@Req() req: Request) {
    // Access request properties
    const authHeader = req.headers['authorization'];
    const customContext = req.context;
    return { authorized: true };
  }
}
```

##### @Res()
Injects the Response object for modifying the response directly.

```typescript
@Lambda()
class ResponseHandler {
  async main(@Res() res: Response) {
    // Modify response properties
    res.setHeader('Cache-Control', 'max-age=3600');
    res.status(201);
    return { created: true };
  }
}
```

#### Service Decorators
- `@Service()`: Marks a class as an injectable service
- `@Inject(token)`: Injects a dependency

### Request Validation

Use class-validator decorators to validate request bodies:

```typescript
import { IsString, IsNumber } from 'class-validator'

export class CreateUserDTO {
  @IsString()
  name: string

  @IsNumber()
  age: number
}

@Lambda()
class CreateUserHandler {
  async main(@Body(CreateUserDTO) user: CreateUserDTO) {
    // user is validated and typed
  }
}
```

### Middleware

Create middleware to handle cross-cutting concerns:

```typescript
import { Middleware, ForgeMiddleware, Request, Response } from 'lambda-forge'

@Middleware
export class AuthMiddleware implements ForgeMiddleware {
  async use(req: Request, res: Response, next: (error?: any) => void) {
    // Validate authentication
    const token = req.headers['authorization']
    if (!token) {
      throw new UnauthorizedError('Missing token')
    }
    next()
  }
}

// Apply middleware to handlers
@Lambda()
class SecureHandler {
  @UseMiddlewares([AuthMiddleware])
  async main() {
    // Only runs if middleware passes
  }
}
```

### Error Handling

Built-in error classes for common HTTP scenarios:

```typescript
import { NotFoundError, BadRequestError } from 'lambda-forge'

@Lambda()
class GetUserHandler {
  async main(@Param('id') id: string) {
    const user = await this.userService.findById(id)
    if (!user) {
      throw new NotFoundError('User not found')
    }
    return user
  }
}
```

### Dependency Injection and Service Initialization

Services can inject other services and use `@OnExecutionStart` for one-time initialization:

```typescript
@Service({ singleton: true })
class DatabaseService {
  private connection: any;

  @OnExecutionStart()
  async initialize() {
    // This will run once when the service is first used
    this.connection = await createDatabaseConnection();
    console.log('Database connection initialized');
  }

  async query(sql: string) {
    return this.connection.query(sql);
  }
}

@Service()
class UserService {
  constructor(
    @Inject(DatabaseService) private db: DatabaseService,
    @Inject(AuthService) private auth: AuthService
  ) {}
}
```

### Framework Integration

lambda-forge is framework-agnostic. Meaning you can use your functions as you would in any IAC tools that support Typescript lambda functions as long as your function exports a `createHttpHandler` or `createHandler`.


#### AWS CDK Example

```typescript
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs'

const handler = new lambda.NodejsFunction(this, 'MyHandler', {
  entry: 'path/to/handler.ts',
  handler: 'handler'
})
```

#### Serverless Framework Example

```yaml
functions:
  myHandler:
    handler: src/handlers/my.handler
    events:
      - http:
          path: /resource
          method: get
```

## Best Practices

1. **Service Organization**: Group related functionality into services
2. **DTO Validation**: Always validate incoming request bodies using DTOs
3. **Error Handling**: Use built-in error classes for consistent error responses
4. **Middleware**: Use middleware for cross-cutting concerns like authentication
5. **Testing**: Take advantage of dependency injection for easy unit testing

## Testing

Lambda Forge makes testing straightforward:

```typescript
describe('MyHandler', () => {
  let handler: MyHandler
  let mockService: jest.Mocked<MyService>

  beforeEach(() => {
    mockService = {
      getData: jest.fn()
    }
    handler = new MyHandler(mockService)
  })

  it('should return data', async () => {
    mockService.getData.mockResolvedValue({ id: '123', data: 'test' })
    const result = await handler.main('123')
    expect(result).toEqual({ id: '123', data: 'test' })
  })
})
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
