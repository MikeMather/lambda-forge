# Lambda forge

![Test Badge](https://github.com/github/docs/actions/workflows/test.yml/badge.svg?branch=main)

Lambda forge is an NPM library that provides a simple and intuitive way to work with AWS Lambda functions in a structured manner that encourages following REST best-practices.

## Features

- Easily create and deploy Lambda functions
- Handle HTTP requests and responses using REST best practices
- Simplify authentication and authorization with custom middleware
- Support for request validation and error handling

## Examples

Here is an example of a lambda API handler to handle blog post creations:

```typescript
import 'reflect-metadata'
import { Lambda, Inject, Returns, Body } from 'lambda-forge'
import { forge } from '../../app'
import PostsService from '../services/PostsService'
import Post from '../entities/Post'
import CreatePostDTO from '../dtos/CreatePostDTO'

@Lambda
class CreatePost {
  constructor(@Inject(PostsService) private postsService: PostsService) {}

  @Returns(201, Post)
  async main(@Body(CreatePostDTO) createPost: CreatePostDTO): Promise<Post> {
    const post = await this.postsService.createPost(createPost)
    return post
  }
}

export const main = forge.createHandler(CreatePost)
```
