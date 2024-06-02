import "reflect-metadata";
import { Service, Inject, HttpResponse } from "lambda-forge";
import DatabaseService from "../../shared/services/databaseService";
import Post from "../entities/Post";

@Service
export default class PostsService {
  constructor(@Inject(DatabaseService) private databaseService: DatabaseService) {}

  async getPosts() {
    await this.databaseService.scan({}).then((data) => {
      if (!data.Items) {
        return [];
      }
      return data.Items.map(Post.fromObject);
    });
  }
}