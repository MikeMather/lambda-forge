import "reflect-metadata";
import { Lambda, Inject, Returns, Query } from 'lambda-forge';
import { unauthForge } from '../../app';
import PostsService from '../services/PostsService';
import Post from '../entities/Post';
import { PostsFilter } from "../dtos/PostsFilter";

@Lambda
class GetPosts {

  constructor(@Inject(PostsService) private postsService: PostsService) { }

  @Returns(200, Post, { many: true })
  async main(@Query() filter: PostsFilter): Promise<Post[]> {
    const posts = await this.postsService.getPosts(filter);
    return posts;
  }
}

export const main = unauthForge.createHandler(GetPosts);
