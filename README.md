# Lambda forge

**Note - this package is still in beta and is not ready to be used in a production environment**

![Test Badge](https://github.com/github/docs/actions/workflows/test.yml/badge.svg?branch=main)

Lambda forge is an NPM library that provides a simple and intuitive way to work with AWS Lambda functions in a structured manner that encourages following REST best-practices.

## Why lambda-forge?

Building REST APIs on AWS Lambda can often involve repetitive code and challenges in maintaining a clean and consistent structure across multiple Lambdas. lambda-forge addresses these issues by offering a framework that emphasizes simplicity, modularity, and testability.

It streamlines the development process, allowing you to focus on business logic while it handles common concerns like dependency injection, validation, and response formatting.

## Advantages

**Decorator-First Approach**

We decorators to enhance the readability and maintainability of your code. Decorators like @Returns, and @Body allow you to define the structure and behavior of your Lambdas in a declarative manner.

<br/>

**Dependency Injection**

Easily inject services directly into your Lambda handlers. This promotes modularity and makes your codebase more organized and easier to test.

<br/>

**Standardized Codebase**

By encouraging an opinionated approach to how your lambdas are written, your code will follow a consistent structure, making it easier for teams to collaborate and maintain large-scale projects.

<br/>

**Type Safety and Validation**

lambda-forge provides tools to do both request body and response schema validations which helps reduce runtime errors and improves development speed and experience.

<br/>

**Seamless Integration with AWS Lambda**

lambda-forge is designed specifically for AWS Lambda, ensuring that your code is optimized for serverless execution. It abstracts away the boilerplate while allowing full control over your Lambda’s behavior.

<br/>

**Deployment Agnostic**

Lambda-forge is deployment-method agnostic. Use your favourite IaC tools such as AWS CDK or Serverless Framework, as long as your typescript compilation method supports decorators.

<br/>

## Getting Started

### Installation

To install lambda-forge, run:

```bash
npm install lambda-forge reflect-metadata
```

For schema validation support, install class-validator and class-transformer

```bash
npm install class-validator class-transformer
```

<br/>

# Example Usage

Here are some examples of using lambda-forge to create a blogging application API. Have a look at the examples directory for more examples and how to integrate it into common IaC frameworks.

Create your lambda generator:

```typescript
import 'reflect-metadata' // Make sure you include this
import { Forge } from 'lambda-forge'
import PostsService from '../services/PostsService'

export const forge = new Forge({ services: [PostsService] })
```

Create a service to inject into your lambdas:

```typescript
import 'reflect-metadata'
import { Service, Inject, HttpResponse } from 'lambda-forge'
import Post from '../entities/Post'
import CreatePostDTO from '../dtos/CreatePostDTO'
import { PostsFilter } from '../dtos/PostsFilter'

@Service
export default class PostsService {
  constructor(@Inject(AnotherService) private myOtherService: AnotherService) {}

  async getPosts(filter: PostsFilter): Promise<Post[]> {
    // get posts
  }

  async getPost(postId: string): Promise<Post[]> {
    // get post by ID
  }

  async createPost(createPost: CreatePostDTO): Promise<Post> {
    // Handle post creation
  }
}
```

Create A DTO for schema validation

```typescript
import { IsString, MaxLength } from 'class-validator'

export default class CreatePostDTO {
  @IsString()
  @MaxLength(300)
  title: string

  @IsString()
  @MaxLength(2000)
  content: string
}
```

Create your request handler

```typescript
import 'reflect-metadata'
import { Lambda, Inject, Returns, Body, Forge } from 'lambda-forge'
import PostsService from '../services/PostsService'
import Post from '../entities/Post'
import CreatePostDTO from '../dtos/CreatePostDTO'
import { forge } from '../app.ts'

@Lambda
class CreatePost {
  constructor(@Inject(PostsService) private postsService: PostsService) {}

  // Must be called 'main'
  @Returns(201, Post)
  async main(@Body(CreatePostDTO) createPost: CreatePostDTO): Promise<Post> {
    const post = await this.postsService.createPost(createPost)
    return post
  }
}

export const main = forge.createHandler(CreatePost)
```

In this example:

The `@Lambda` decorator marks the class as a Lambda function.

The `@Inject` decorator injects the PostsService into the class.

The `@Returns` decorator defines the expected response type and status code.

The `@Body` decorator handles validation and type safety for the request body.

A handler to get a single post:

```typescript
import 'reflect-metadata'
import { Lambda, Inject, Returns, Body, Forge } from 'lambda-forge'
import PostsService from '../services/PostsService'
import Post from '../entities/Post'
import CreatePostDTO from '../dtos/CreatePostDTO'
import { forge } from '../app.ts'

@Lambda
class GetPost {
  constructor(@Inject(PostsService) private postsService: PostsService) {}

  @Returns(200, Post)
  async main(@Param('id') postId: string): Promise<Post> {
    return await this.postsService.getPost(postId)
  }
}

export const main = forge.createHandler(CreatePost)
```

In this example, we use the `@Param` decorator to extract the path parameter from the request.

A handler to get multiple posts:

```typescript
import 'reflect-metadata'
import { Lambda, Inject, Returns, Query } from 'lambda-forge'
import { unauthForge } from '../../app'
import PostsService from '../services/PostsService'
import Post from '../entities/Post'
import { PostsFilter } from '../dtos/PostsFilter'

@Lambda
class GetPosts {
  constructor(@Inject(PostsService) private postsService: PostsService) {}

  @Returns(200, Post, { many: true })
  async main(@Query() filter: PostsFilter): Promise<Post[]> {
    const posts = await this.postsService.getPosts(filter)
    return posts
  }
}

export const main = unauthForge.createHandler(GetPosts)
```

In this example, we use the @Query decorator to extract the query parameters from the request.
We also use `{ many: true }` as the last argument to the `@Returns` decorator to ensure that the lambda returns an array as its response.

<br/>

# Contributing

We welcome contributions! Please submit pull requests or open issues to suggest improvements or report bugs.

# License

This project is licensed under the MIT License.
