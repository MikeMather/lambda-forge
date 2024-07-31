import "reflect-metadata";
import { Lambda, Inject, Returns, Body } from 'lambda-forge';
import { unauthForge } from '../../app';
import PostsService from '../services/PostsService';
import Post from '../entities/Post';
import CreatePostDTO from "../dtos/CreatePostDTO";

@Lambda
class CreatePost {

  constructor(@Inject(PostsService) private postsService: PostsService) { }

  @Returns(201, Post)
  async main(@Body(CreatePostDTO) createPost: CreatePostDTO): Promise<Post> {
    const post = await this.postsService.createPost(createPost);
    return post;
  }
}

export const main = unauthForge.createHandler(CreatePost);
