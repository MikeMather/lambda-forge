import { HttpResponse, Lambda, Inject } from 'lambda-forge';
import { unauthForge } from '../../app';
import Post from '../entities/Post';
import PostsService from '../services/PostsService';

@Lambda
class GetPosts {

  constructor(@Inject(PostsService) private postsService: PostsService) { }

  async main() {
    const posts = await this.postsService.getPosts();
    return HttpResponse.ok(posts);
  }
}

export const main = unauthForge.createHandler(GetPosts);
