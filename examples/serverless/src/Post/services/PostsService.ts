import "reflect-metadata";
import { Service, Inject, HttpResponse } from "lambda-forge";
import DatabaseService from "../../shared/services/databaseService";
import Post from "../entities/Post";
import CreatePostDTO from "../dtos/CreatePostDTO";
import KSUID from "ksuid";
import { PostsFilter } from "../dtos/PostsFilter";

@Service
export default class PostsService {
  constructor(@Inject(DatabaseService) private databaseService: DatabaseService) {}

  async getPosts(filter: PostsFilter): Promise<Post[]> {
    let query;
    if (filter.user) {
      query = {
        KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
        ExpressionAttributeValues: {
          ":pk": "POST",
          ":sk": `POST#${filter.user}`
        }
      };
    }
    else {
      query = {
        KeyConditionExpression: "PK = :pk",
        ExpressionAttributeValues: {
          ":pk": "POST",
        }
      };
    }
    const posts = await this.databaseService.query(query);
    return posts.Items as Post[];
  }

  async createPost(createPost: CreatePostDTO): Promise<Post> {
    const post = new Post();
    post.id = KSUID.randomSync().string;
    post.title = createPost.title;
    post.content = createPost.content;
    post.userHandle = "userHandle";
    post.PK = `POST`;
    post.SK = `POST#${post.userHandle}#${post.id}`;
    post.createdAt = new Date().toISOString();
    post.validate();
    await this.databaseService.put({
      Item: post.toObject()
    });
    return post;
  }
}