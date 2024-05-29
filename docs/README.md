# lambda-forge

Lambda Forge is a powerful NPM library designed to provide a structured and reliable approach to creating AWS Lambda functions. By leveraging decorators and dependency injection, Lambda Forge simplifies the process of building and managing Lambda functions, making your code more organized and maintainable.

```typescript
@Lambda
class GetToDoHandler {
  constructor(@Inject(ToDoService) private toDoService: ToDoService) {}

  public async main(@Param('id') id: string): Promise<APIGatewayProxyResult> {
    const todo = this.toDoService.getById(parseInt(id))
    if (!todo) {
      throw new NotFoundError('Todo not found')
    }
    return HttpResponse.ok(todo)
  }
}
```

## Features

- **Structure and Organization:** By using decorators and a class-based approach, Lambda Forge helps you keep your Lambda functions organized, maintainable and testable.
- **Dependency Injection:** Seamlessly integrate services and manage dependencies with tsyringe, making your code modular and testable.
- **Simplified Request Handling:** Easily handle HTTP requests and responses with built-in support for body and parameter parsing, schema validation, and error handling.
- **RESTful Practices:** Apply RESTful design principles to your Lambda functions, making them more predictable and easier to work with.
- **Framework agnostic:** Lambda forge can work with any existing IaC tools like AWS CDK, Serverless Framework and Terraform.
